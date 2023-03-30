import { Controller, Post, Body, ValidationPipe, UseGuards, Get, Param, Patch, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { ReturnUserDto } from './dtos/return-user.dto';
import { UserRole } from './user-roles.enum';
import { UsersService } from './users.service';
import { Role } from '../auth/role.decorator';
import { UpdateUserDto } from './dtos/update-user.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from './user.entity';
@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {
    constructor(private usersService: UsersService){}

    @Post()
    @Role(UserRole.ADMIN)
    async createAdminUser(
        @Body(ValidationPipe) createUserDto: CreateUserDto
    ): Promise<ReturnUserDto> {
        const user = await this.usersService.createAdminUser(createUserDto)

        return {
            user,
            message: 'Administrador cadastro com sucesso'
        }
    }

    @Get(':id')
    @Role(UserRole.ADMIN)
    async findUserByid(@Param('id') id): Promise<ReturnUserDto> {
        const user = await this.usersService.findByUserId(id)
        return {
            user,
            message: 'Usuário encontrado'
        }
    }


    @Patch(':id')
    async updateUser(
        @Body(ValidationPipe) updateUserDto: UpdateUserDto,
        @GetUser() user: User,
        @Param('id') id: string
    ) {
        if(user.role !== UserRole.ADMIN && user.id.toString() !== id) {
            throw new ForbiddenException('Você não tem autorização para acessar esse recurso')
        } else {
            return this.usersService.updateUser(updateUserDto, id)
        }
    }

}

