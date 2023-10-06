import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MedicalRecord } from './medical-record.entity';
import { CreateMedicalRecordDto } from './dtos/create-medical-record.dto';

@Injectable()
export class MedicalRecordRepository extends Repository<MedicalRecord> {
  constructor(private dataSource: DataSource) {
    super(MedicalRecord, dataSource.createEntityManager());
  }
  async createMedicalRecord(
    createMedicalRecordDto: CreateMedicalRecordDto,
  ): Promise<MedicalRecord> {
    const { patient } = createMedicalRecordDto;
    const medicalRecord = new MedicalRecord();
    medicalRecord.patient = patient;
    try {
      await medicalRecord.save();
      return medicalRecord;
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
}
