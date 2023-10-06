import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Appointment } from '../appointments/appointment.entity';
import { User } from '../users/user.entity';

@Entity()
export class DoctorWallet extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //relations
  @OneToMany(() => Appointment, (appointment) => appointment.doctor_wallet)
  appointments: Appointment[];

  @OneToOne(() => User, (user) => user.doctor_wallet)
  doctor: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
