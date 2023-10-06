import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { PatientGender } from './enums/patient-gender.enum';
import { PatientOrigin } from './enums/patient-origin.enum';
import { Appointment } from '../appointments/appointment.entity';
import { Disease } from '../diseases/diseases.entity';
import { Prescription } from '../prescriptions/prescriptions.entity';

@Entity()
@Unique(['cpf'])
@Unique(['id'])
export class Patient extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({ nullable: true, type: 'varchar', length: 200 })
  email: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: PatientGender,
    default: PatientGender.OTHER,
  })
  gender: PatientGender;

  @Column({
    nullable: false,
    type: 'enum',
    enum: PatientOrigin,
    default: PatientOrigin.OTHER,
  })
  origin: PatientOrigin;

  @Column({ nullable: false, type: 'date' })
  birth_date: Date;

  @Column({ nullable: false, type: 'varchar', length: 11 })
  cpf: string;

  @Column({ nullable: false, type: 'varchar', length: 11 })
  primary_contact: string;

  @Column({ nullable: true, type: 'varchar', length: 11 })
  secondary_contact: string;

  @Column({ nullable: true, type: 'varchar', length: 200 })
  address: string;
  // relations
  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];

  @OneToMany(() => Prescription, (prescription) => prescription.patient)
  prescriptions: Prescription[];

  @OneToMany(() => Disease, (disease) => disease.patient)
  diseases: Disease[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
