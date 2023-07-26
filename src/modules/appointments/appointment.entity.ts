import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Patient } from "../patient/patient.entity";
import { User } from "../users/user.entity";
import { MedicalRecord } from "../medical-record/medical-record.entity";

@Entity()
export class Appointment extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;




    //relations
    @ManyToOne(() => MedicalRecord, (medical_record) => medical_record.appointments)
    medical_record: MedicalRecord;

    // @ManyToOne(() => User, (user) => user.appointments)
    // doctor: User;

    
    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
    

}