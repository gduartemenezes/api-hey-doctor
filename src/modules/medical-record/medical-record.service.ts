import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalRecord } from './medical-record.entity';
import { CreateMedicalRecordDto } from './dtos/create-medical-record.dto';
import { MedicalRecordRepository } from '../medical-record/medical-record.repository';

@Injectable()
export class MedicalRecordService {
  constructor(
    @InjectRepository(MedicalRecordRepository)
    private medicalRecordRepository: MedicalRecordRepository,
  ) {}

  async createMedicalRecord(
    createMedicalRecordDto: CreateMedicalRecordDto,
  ): Promise<MedicalRecord> {
    const medicalRecord =
      await this.medicalRecordRepository.createMedicalRecord(
        createMedicalRecordDto,
      );

    return medicalRecord;
  }

  async findById(id: string): Promise<MedicalRecord> {
    const medicalRecord = this.medicalRecordRepository.findOne({
      where: { id },
    });
    if (!medicalRecord) throw new NotFoundException('Não encontrado');
    return medicalRecord;
  }

  async deleteMedicalRecord(id: string): Promise<void> {
    const result = await this.medicalRecordRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Não foi encontrado com o ID informado');
    }
  }
}
