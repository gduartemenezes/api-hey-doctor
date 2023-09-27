import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreatAppointmentDto } from './dtos/create-appointment.dto';
import { MedicalRecord } from '../medical-record/medical-record.entity';
import { DoctorWallet } from '../doctor-wallet/doctor-wallet.entity';

@Injectable()
export class AppointmentRepository extends Repository<Appointment> {
  constructor(private dataSource: DataSource) {
    super(Appointment, dataSource.createEntityManager());
  }

  async createAppointment(
    createAppointmentDto: CreatAppointmentDto,
    medicalRecord: MedicalRecord,
    doctorWallet: DoctorWallet,
  ): Promise<Appointment> {
    const { reason, observations, payment_method, payment_status, schedule } =
      createAppointmentDto;
    const appointment = new Appointment();
    appointment.reason = reason;
    appointment.observations = observations;
    appointment.medical_record = medicalRecord;
    appointment.doctor_wallet = doctorWallet;
    appointment.schedule = schedule;
    appointment.payment_method = payment_method;
    appointment.payment_status = payment_status;

    try {
      await appointment.save();
      return appointment;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar o agendamento no banco de dados',
      );
    }
  }
}
