import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Patient } from '../patient/patient.entity';
import { User } from '../users/user.entity';
import { MedicalRecord } from '../medical-record/medical-record.entity';
import { DoctorWallet } from '../doctor-wallet/doctor-wallet.entity';
import { PaymentMethod } from './enums/payment-method.enum';
import { AppointmentStatus } from './enums/appointment-status.enum';
import { PaymentStatus } from './enums/payment-status.enum';

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
  @ManyToOne(
    () => MedicalRecord,
    (medical_record) => medical_record.appointments,
  )
  medical_record: MedicalRecord;

  @ManyToOne(() => DoctorWallet, (doctor_wallet) => doctor_wallet.appointments)
  doctor_wallet: DoctorWallet;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
