import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentRepository } from './appointment.repository';
import { Repository } from 'typeorm';
import { MedicalRecord } from '../medical-record/medical-record.entity';
import { DoctorWallet } from '../doctor-wallet/doctor-wallet.entity';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { FindAppointmentsQueryDto } from './dtos/find-appointments-query.dto';
import { UpdateAppointmentDto } from './dtos/update-appointment.dto';

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
    createAppointmentDto: CreateAppointmentDto,
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

  async findById(id: string): Promise<Appointment> {
    const appointment = this.appointmentRepository.findOne({
      where: { id },
    });
    if (!appointment) throw new NotFoundException('Agendamento não encontrado');
    return appointment;
  }

  async findAppointments(
    queryDto: FindAppointmentsQueryDto,
  ): Promise<{ appointments: Appointment[]; total: number }> {
    return await this.appointmentRepository.findAppointments(queryDto);
  }

  async updateAppointment(
    updateAppointmentDto: UpdateAppointmentDto,
    id: string,
  ): Promise<Appointment> {
    const appointment = await this.findById(id);

    const { payment_method, payment_status, observations, reason, schedule } =
      updateAppointmentDto;

    appointment.schedule = schedule ? schedule : appointment.schedule;
    appointment.reason = reason ? reason : appointment.reason;
    appointment.observations = observations
      ? observations
      : appointment.observations;
    appointment.payment_method = payment_method
      ? payment_method
      : appointment.payment_method;
    appointment.payment_status = payment_status
      ? payment_status
      : appointment.payment_status;

    try {
      await appointment.save();
      return appointment;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar dados no banco de dados',
      );
    }
  }

  async deleteAppointment(id: string): Promise<void> {
    const result = await this.appointmentRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um agendamento com o ID informado',
      );
    }
  }
}
