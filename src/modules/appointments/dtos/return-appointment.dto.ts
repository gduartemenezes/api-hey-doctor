import { Appointment } from '../appointment.entity';

export class ReturnAppointmentDto {
  appointment: Appointment;
  message: string;
}
