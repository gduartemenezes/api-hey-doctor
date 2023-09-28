import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreatePatientDto,
  UpdatePatientDto,
  FindPatientsQueryDto,
} from './dtos';

import { InjectRepository } from '@nestjs/typeorm';
import { PatientRepository } from './patient.repository';
import { Patient } from './patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientRepository)
    private patientRepository: PatientRepository,
  ) {}

  async createPatient(createPatientDto: CreatePatientDto): Promise<Patient> {
    return this.patientRepository.createPatient(createPatientDto);
  }

  async findByPatientId(id: string): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { id },
    });

    if (!patient) throw new NotFoundException('Paciente não encontrado');

    return patient;
  }

  async updatePatient(
    updatePatientDto: UpdatePatientDto,
    id: string,
  ): Promise<Patient> {
    const patient = await this.findByPatientId(id);

    const {
      name,
      email,
      address,
      birth_date,
      cpf,
      gender,
      origin,
      primary_contact,
      secondary_contact,
    } = updatePatientDto;

    patient.name = name ? name : patient.name;
    patient.email = email ? email : patient.email;
    patient.address = address ? address : patient.address;
    patient.birth_date = birth_date ? birth_date : patient.birth_date;
    patient.cpf = cpf ? cpf : patient.cpf;
    patient.gender = gender ? gender : patient.gender;
    patient.origin = origin ? origin : patient.origin;
    patient.primary_contact = primary_contact
      ? primary_contact
      : patient.primary_contact;
    patient.secondary_contact = secondary_contact
      ? secondary_contact
      : patient.secondary_contact;

    try {
      await patient.save();
      return patient;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar dados no banco de dados',
      );
    }
  }

  async deletePatient(id: string): Promise<void> {
    const result = await this.patientRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um paciente com o ID informado',
      );
    }
  }

  async findPatients(
    queryDto: FindPatientsQueryDto,
  ): Promise<{ patients: Patient[]; total: number }> {
    const { patients, total } = await this.patientRepository.findPatients(
      queryDto,
    );
    return { patients, total };
  }
}
