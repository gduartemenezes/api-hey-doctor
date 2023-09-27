import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentRepository } from './appointment.repository';
import { Repository } from 'typeorm';
import { MedicalRecord } from '../medical-record/medical-record.entity';
import { DoctorWallet } from '../doctor-wallet/doctor-wallet.entity';
import { Appointment } from './appointment.entity';
import { CreatAppointmentDto } from './dtos/create-appointment.dto';

class MedicalRecordRepository extends Repository<MedicalRecord> {
  async findById(id: string): Promise<MedicalRecord> {
    return Promise.resolve(new MedicalRecord());
  }
}
class DoctorWalletRepository extends Repository<DoctorWallet> {
  async findById(id: string): Promise<DoctorWallet> {
    return Promise.resolve(new DoctorWallet());
  }
}

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(AppointmentRepository)
    private appointmentRepository: AppointmentRepository,
    @InjectRepository(MedicalRecordRepository)
    private medicalRecordRepository: MedicalRecordRepository,
    @InjectRepository(DoctorWalletRepository)
    private doctorWalletRepository: DoctorWalletRepository,
  ) {}

  async createAppointment(
    createAppointmentDto: CreatAppointmentDto,
  ): Promise<Appointment> {
    const { doctor_wallet_id, medical_record_id } = createAppointmentDto;
    const doctorWallet = await this.doctorWalletRepository.findById(
      doctor_wallet_id,
    );
    const medicalRecord = await this.medicalRecordRepository.findById(
      medical_record_id,
    );

    const appointment = this.appointmentRepository.createAppointment(
      createAppointmentDto,
      medicalRecord,
      doctorWallet,
    );

    return appointment;
  }
}
