import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { PatientGender } from './enums/patient-gender.enum';
import { PatientOrigin } from './enums/patient-origin.enum';
import { MedicalRecord } from '../medical-record/medical-record.entity';

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
  @OneToOne(() => MedicalRecord, (medical_record) => medical_record.patient)
  medical_record: MedicalRecord;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
