import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto';
import { UserRole } from 'src/modules/users/user-roles.enum';
import { User } from 'src/modules/users/user.entity';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService
    ){}
    async singUp(createUserDto: CreateUserDto): Promise<User> {
        if(createUserDto.password !== createUserDto.passwordConfirmation) {
            throw new UnprocessableEntityException('As senhas não conferem')
        } else {
            return await this.usersService.createUser(createUserDto, UserRole.USER)
        }
    }
}
