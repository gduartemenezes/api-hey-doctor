import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Param,
  Patch,
  ForbiddenException,
  Delete,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../users/user-roles.enum';
import { Role } from '../auth/role.decorator';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { ReturnAppointmentDto } from './dtos/return-appointment.dto';
import { GetUser } from '../auth/get-user.decorator';
@Controller('appointments')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {
  constructor(private appointmentService: AppointmentService) {}

  @Post()
  @Role(UserRole.ADMIN)
  @Role(UserRole.DOCTOR)
  async createAdminUser(
    @Body(ValidationPipe) createAppointmentDto: CreateAppointmentDto,
  ): Promise<ReturnAppointmentDto> {
    const appointment = await this.appointmentService.createAppointment(
      createAppointmentDto,
    );

    return {
      appointment,
      message: 'Administrador cadastro com sucesso',
    };
  }

  @Get(':id')
  @Role(UserRole.ADMIN)
  @Role(UserRole.DOCTOR)
  async findByid(@Param('id') id): Promise<ReturnAppointmentDto> {
    const appointment = await this.appointmentService.findById(id);
    return {
      appointment,
      message: 'Usuário encontrado',
    };
  }

  // @Patch(':id')
  // async updateUser(
  //   @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  //   @GetUser() user: User,
  //   @Param('id') id: string,
  // ) {
  //   if (user.role !== UserRole.ADMIN && user.id.toString() !== id) {
  //     throw new ForbiddenException(
  //       'Você não tem autorização para acessar esse recurso',
  //     );
  //   } else {
  //     return this.usersService.updateUser(updateUserDto, id);
  //   }
  // }

  // @Delete(':id')
  // @Role(UserRole.ADMIN)
  // @Role(UserRole.DOCTOR)
  // async deleteUser(@Param('id') id: string) {
  //   await this.usersService.deleteUser(id);
  //   return { message: 'Usuário removido com sucesso' };
  // }

  // @Get()
  // @Role(UserRole.ADMIN)
  // async findUsers(@Query() query: FindUsersQueryDto) {
  //   const found = await this.usersService.findUsers(query);

  //   return found;
  // }
}
