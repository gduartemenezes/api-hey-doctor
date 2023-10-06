import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import {
  CreatePatientDto,
  FindPatientsQueryDto,
  ReturnPatientDto,
  UpdatePatientDto,
} from './dtos/';
import { UserRole } from '../users/user-roles.enum';
import { Role } from '../auth/role.decorator';
import { PatientService } from './patient.service';

@Controller('patient')
@UseGuards(AuthGuard(), RolesGuard)
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Post()
  @Role(UserRole.ADMIN)
  @Role(UserRole.DOCTOR)
  @Role(UserRole.USER)
  async createPatient(
    @Body(ValidationPipe) createPatientDto: CreatePatientDto,
  ): Promise<ReturnPatientDto> {
    const patient = await this.patientService.createPatient(createPatientDto);

    return {
      patient,
      message: 'Administrador cadastro com sucesso',
    };
  }

  @Get(':id')
  @Role(UserRole.ADMIN)
  @Role(UserRole.DOCTOR)
  @Role(UserRole.USER)
  async findUserByid(@Param('id') id): Promise<ReturnPatientDto> {
    const patient = await this.patientService.findByPatientId(id);
    return {
      patient,
      message: 'Usuário encontrado',
    };
  }

  @Patch(':id')
  async updatePatient(
    @Body(ValidationPipe) updatePatientDto: UpdatePatientDto,
    @Param('id') id: string,
  ) {
    return this.patientService.updatePatient(updatePatientDto, id);
  }

  @Delete(':id')
  @Role(UserRole.ADMIN)
  @Role(UserRole.DOCTOR)
  async deleteUser(@Param('id') id: string) {
    await this.patientService.deletePatient(id);
    return { message: 'Paciente removido com sucesso' };
  }

  @Get()
  @Role(UserRole.ADMIN)
  @Role(UserRole.DOCTOR)
  @Role(UserRole.USER)
  async findUsers(@Query() query: FindPatientsQueryDto) {
    const found = await this.patientService.findPatients(query);

    return found;
  }
}
