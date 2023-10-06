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
export class Disease extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // relations
  @ManyToOne(() => Patient, (patient) => patient.diseases)
  patient: Patient;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
