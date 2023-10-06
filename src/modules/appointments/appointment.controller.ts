import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Param,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../users/user-roles.enum';
import { Role } from '../auth/role.decorator';
import { AppointmentService } from './appointment.service';
import {
  CreateAppointmentDto,
  FindAppointmentsQueryDto,
  ReturnAppointmentDto,
  UpdateAppointmentDto,
} from './dtos/';
@Controller('appointment')
@UseGuards(AuthGuard(), RolesGuard)
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Post()
  @Role(UserRole.ADMIN)
  @Role(UserRole.DOCTOR)
  @Role(UserRole.USER)
  async createAppointment(
    @Body(ValidationPipe) createAppointmentDto: CreateAppointmentDto,
  ): Promise<ReturnAppointmentDto> {
    const appointment = await this.appointmentService.createAppointment(
      createAppointmentDto,
    );
    return {
      appointment,
      message: 'Agendamento cadastrado com sucesso',
    };
  }

  @Get(':id')
  @Role(UserRole.ADMIN)
  @Role(UserRole.DOCTOR)
  @Role(UserRole.USER)
  async findByid(@Param('id') id): Promise<ReturnAppointmentDto> {
    const appointment = await this.appointmentService.findById(id);
    return {
      appointment,
      message: 'Agendamento encontrado',
    };
  }

  @Patch(':id')
  @Role(UserRole.ADMIN)
  @Role(UserRole.DOCTOR)
  @Role(UserRole.USER)
  async updateAppointment(
    @Body(ValidationPipe) updateAppoinmentDto: UpdateAppointmentDto,
    @Param('id') id: string,
  ) {
    return this.appointmentService.updateAppointment(updateAppoinmentDto, id);
  }

  @Delete(':id')
  @Role(UserRole.ADMIN)
  async deleteAppointment(@Param('id') id: string) {
    await this.appointmentService.deleteAppointment(id);
    return { message: 'Agendamento removido com sucesso' };
  }

  @Get()
  @Role(UserRole.ADMIN)
  @Role(UserRole.DOCTOR)
  @Role(UserRole.USER)
  async findAppointment(@Query() query: FindAppointmentsQueryDto) {
    const found = await this.appointmentService.findAppointments(query);

    return found;
  }
}
