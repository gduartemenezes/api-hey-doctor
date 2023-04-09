import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto'
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserRole } from "./user-roles.enum";
import { User } from "./user.entity";
import { CredentialsDto } from "../auth/dtos/credentials.dto";
import { FindUsersQueryDto } from "./dtos/find-users-query-dto";

@Injectable()
export class UsersRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager())
    }
    async createUser(
        createUserDto: CreateUserDto,
    ): Promise<User> {
        const { email, name, password, role } = createUserDto;
        const user = new User()

        user.email = email
        user.name = name
        user.email = email
        user.role = role
        user.status = true
        user.confirmationToken = crypto.randomBytes(32).toString('hex')
        user.salt = await bcrypt.genSalt()
        user.password = await this.hashPassword(password, user.salt)

        try {
            await user.save()
            delete user.password
            delete user.salt
            return user
        } catch (error) {
            if (error.code.toString() === '23505') {
                throw new ConflictException('Endereço de email já está em uso')
            } else {
                console.log(error)
                throw new InternalServerErrorException(
                    'Erro ao salvar o usuário no banco de dados'
                )
            }
        }

    }

    async findUsers(queryDto: FindUsersQueryDto): Promise<{users: User[], total: number}> {
        queryDto.status = queryDto.status === undefined ? true : queryDto.status
        queryDto.page = queryDto.page < 1 ? 1 : queryDto.page
        queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit

        const {email, name, status, role} = queryDto

        const query = this.createQueryBuilder('user')
        query.where('user.status = :status', {status})

        if(email) query.andWhere('user.email ILIKE :email', {email: `%${email}%`})

        if(name) query.andWhere('user.name ILIKE :name', {name: `%${name}%`})

        if(role) query.andWhere('user.role =  :role', {role})

        query.skip((queryDto.page - 1) * queryDto.limit)
        query.take(+queryDto.limit)
        query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined)

        query.select(['user.name', 'user.email', 'user.status', 'user.role'])

        const [users, total] = await query.getManyAndCount()

        return {users, total}

    }


    async checkCredentials(creadentialsDto: CredentialsDto): Promise<User> {
        const { email, password } = creadentialsDto
        const user = await this.findOneBy({ email })

        if (user && await user.checkPassword(password)) {
            return user
        } else {
            return null
        }

    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt)

    }
}