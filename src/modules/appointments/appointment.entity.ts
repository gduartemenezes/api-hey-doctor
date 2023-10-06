import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DoctorWallet } from '../doctor-wallet/doctor-wallet.entity';
import { PaymentMethod, AppointmentStatus, PaymentStatus } from './enums/';
import { Patient } from '../patient/patient.entity';

@Entity()
export class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'varchar', length: 200 })
  reason: string;

  @Column({ nullable: true, type: 'varchar', length: 400 })
  observations: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.CASH,
  })
  payment_method: PaymentMethod;

  @Column({
    nullable: false,
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  appointment_status: AppointmentStatus;

  @Column({
    nullable: false,
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  payment_status: PaymentStatus;

  @Column({ nullable: false, type: 'float' })
  value: number;

  @Column({ nullable: false, type: 'timestamp' })
  schedule: Date;

  //relations
  @ManyToOne(() => Patient, (patient) => patient.appointments)
  patient: Patient;

  @ManyToOne(() => DoctorWallet, (doctor_wallet) => doctor_wallet.appointments)
  doctor_wallet: DoctorWallet;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
