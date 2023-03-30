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

}
