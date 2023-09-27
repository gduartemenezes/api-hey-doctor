import { BaseEntity, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Appointment } from "../appointments/appointment.entity";

@Entity()
export class DoctorWallet extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;


    //relations
    @OneToMany(()=> Appointment, (appointment) => appointment.doctor_wallet)
    appointments: Appointment[]

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;
}