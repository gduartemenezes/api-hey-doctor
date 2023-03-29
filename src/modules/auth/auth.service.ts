import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto';
import { UserRole } from 'src/modules/users/user-roles.enum';
import { User } from 'src/modules/users/user.entity';
import { UsersRepository } from '../users/users.repository';
import { CredentialsDto } from './dtos/credentials.dto';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private jwtService: JwtService
    ){}
    async singUp(createUserDto: CreateUserDto): Promise<User> {
        if(createUserDto.password !== createUserDto.passwordConfirmation) {
            throw new UnprocessableEntityException('As senhas não conferem')
        } else {
            return await this.usersRepository.createUser(createUserDto, UserRole.USER)
        }
    }

    async signIn(credentialsDto: CredentialsDto) {
        const user = await this.usersRepository.checkCredentials(credentialsDto)

        if(user === null) {
            throw new UnauthorizedException('Credenciais inválidas')
        }
        const jwtPayload = {
            id: user.id
        }
        const token = await this.jwtService.sign(jwtPayload)

        return {token}
    }
}
