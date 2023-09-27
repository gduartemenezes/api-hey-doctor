import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Param,
  ForbiddenException,
  Delete,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../users/user-roles.enum';
import { Role } from '../auth/role.decorator';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto, ReturnAppointmentDto } from './dtos/';
@Controller('appointments')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {
  constructor(private appointmentService: AppointmentService) {}

  @Post()
  @Role(UserRole.ADMIN)
  @Role(UserRole.DOCTOR)
  async createAppointment(
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
}
