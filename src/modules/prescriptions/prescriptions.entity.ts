import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Patient } from '../patient/patient.entity';

@Entity()
export class Prescription extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // relations
  @ManyToOne(() => Patient, (patient) => patient.prescriptions)
  patient: Patient;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
