import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Patient } from '../patient/patient.entity';
import { Appointment } from '../appointments/appointment.entity';
import { Prescription } from '../prescriptions/prescriptions.entity';
import { Disease } from '../diseases/diseases.entity';

@Entity()
@Unique(['patient'])
export class MedicalRecord extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // relations
  @OneToOne(() => Patient, (patient) => patient.medical_record)
  patient: Patient;

  @OneToMany(() => Appointment, (appointment) => appointment.medical_record)
  appointments: Appointment[];

  @OneToMany(() => Prescription, (prescription) => prescription.medical_record)
  prescriptions: Prescription[];

  @OneToMany(() => Disease, (disease) => disease.medical_record)
  diseases: Disease[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
