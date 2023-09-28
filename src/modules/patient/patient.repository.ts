import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { CreatePatientDto, FindPatientsQueryDto } from './dtos';

@Injectable()
export class PatientRepository extends Repository<Patient> {
  constructor(private dataSource: DataSource) {
    super(Patient, dataSource.createEntityManager());
  }
  async createPatient(createPatientDto: CreatePatientDto): Promise<Patient> {
    const {
      email,
      name,
      address,
      birth_date,
      cpf,
      gender,
      origin,
      primary_contact,
      secondary_contact,
    } = createPatientDto;
    const patient = new Patient();

    patient.email = email;
    patient.name = name;
    patient.address = address;
    patient.birth_date = birth_date;
    patient.cpf = cpf;
    patient.gender = gender;
    patient.origin = origin;
    patient.primary_contact = primary_contact;
    patient.secondary_contact = secondary_contact;

    try {
      await patient.save();
      return patient;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Endereço de email já está em uso');
      } else {
        console.log(error);
        throw new InternalServerErrorException(
          'Erro ao salvar o paciente no banco de dados',
        );
      }
    }
  }

  async findPatients(
    queryDto: FindPatientsQueryDto,
  ): Promise<{ patients: Patient[]; total: number }> {
    queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
    queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;
    const query = this.createQueryBuilder('patient');

    query.skip((queryDto.page - 1) * queryDto.limit);
    query.take(+queryDto.limit);
    query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);

    query.select(['*']);

    const [patients, total] = await query.getManyAndCount();

    return { patients, total };
  }
}
