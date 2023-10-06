import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { DoctorWallet } from '../doctor-wallet/doctor-wallet.entity';
import { FindAppointmentsQueryDto } from './dtos/find-appointments-query.dto';
import { Patient } from '../patient/patient.entity';

@Injectable()
export class AppointmentRepository extends Repository<Appointment> {
  constructor(private dataSource: DataSource) {
    super(Appointment, dataSource.createEntityManager());
  }

  async createAppointment(
    createAppointmentDto: CreateAppointmentDto,
    patient: Patient,
    doctorWallet: DoctorWallet,
  ): Promise<Appointment> {
    const { reason, observations, payment_method, payment_status, schedule } =
      createAppointmentDto;
    const appointment = new Appointment();
    appointment.reason = reason;
    appointment.observations = observations;
    appointment.patient = patient;
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

  async findAppointments(queryDto: FindAppointmentsQueryDto): Promise<{
    appointments: Appointment[];
    total: number;
  }> {
    const { page, limit, sort } = queryDto;
    const query = this.createQueryBuilder('appointment');
    query.skip((page - 1) * limit);
    query.take(+queryDto.limit);
    query.orderBy(sort ? JSON.parse(sort) : undefined);
    query.select(['*']);

    try {
      const [appointments, total] = await query.getManyAndCount();
      return { appointments, total };
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar dados no banco');
    }
  }
}
