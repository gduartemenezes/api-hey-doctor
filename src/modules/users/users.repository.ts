import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto'
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserRole } from "./user-roles.enum";
import { User } from "./user.entity";
import { CredentialsDto } from "../auth/dtos/credentials.dto";

@Injectable()
export class UsersRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager())
    }
    async createUser(
        createUserDto: CreateUserDto,
        role: UserRole
    ): Promise<User> {
        const { email, name, password } = createUserDto;
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