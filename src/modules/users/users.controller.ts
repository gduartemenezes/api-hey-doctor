import { Controller, Post, Body, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { ReturnUserDto } from './dtos/return-user.dto';
import { UserRole } from './user-roles.enum';
import { UsersService } from './users.service';
import { Role } from '../auth/role.decorator';
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Post()
    @Role(UserRole.ADMIN)
    @UseGuards(AuthGuard(), RolesGuard)
    async createAdminUser(
        @Body(ValidationPipe) createUserDto: CreateUserDto
    ): Promise<ReturnUserDto> {
        const user = await this.usersService.createAdminUser(createUserDto)

        return {
            user,
            message: 'Administrador cadastro com sucesso'
        }
    }


}

