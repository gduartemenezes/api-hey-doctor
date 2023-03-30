import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRole } from './user-roles.enum';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto'
import { CredentialsDto } from '../auth/dtos/credentials.dto';
import { DataSource } from 'typeorm';
import { typeOrmConfig, typeOrmDataSourceOptions } from 'src/configs/typeorm.config';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
    constructor( @InjectRepository(UsersRepository) private usersRepository: UsersRepository
    ){}
    
    async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
        if (createUserDto.password !== createUserDto.passwordConfirmation) {
            throw new UnprocessableEntityException('As senhas não conferem');
        } else {
            return this.usersRepository.createUser(createUserDto, UserRole.ADMIN)
        }
    }


    async findByUserId(id: string): Promise<User> {
        const user = await this.usersRepository.findOne({where:{id}, select: ['id', 'name', 'role', 'email']})

        if(!user) throw new NotFoundException('Usuário não encontrado')

        return user
    }

    async updateUser(updateUserDto: UpdateUserDto, id: string): Promise<User> {
        const user = await this.findByUserId(id)

        const {name, email, role, status} = updateUserDto

        user.name = name ? name : user.name
        user.email = email ? email : user.email
        user.role = role ? role : user.role
        user.status = status === undefined ? user.status : status

        try {
            await user.save()
            return user
        } catch (error) {
            throw new InternalServerErrorException('Erro ao salvar dados no banco de dados')
        }

    }

    async deleteUser(id: string): Promise<void> {
        const result = await this.usersRepository.delete({id})
        if(result.affected === 0) {
            throw new NotFoundException('Não foi encontrado um usuário com o ID informado')
        }
    }

}
