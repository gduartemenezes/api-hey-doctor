import { ConflictException, Injectable, InternalServerErrorException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRole } from './user-roles.enum';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto'

@Injectable()
export class UsersService {
    constructor(
    ){}
    
    async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
        if(createUserDto.password !== createUserDto.passwordConfirmation) {
            throw new UnprocessableEntityException('As senhas não conferem')
        } else {
            return this.createUser(createUserDto, UserRole.ADMIN)
        }
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
    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt)

    }
}
