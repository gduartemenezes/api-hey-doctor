import { BaseEntity, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MedicalRecord } from "../medical-record/medical-record.entity";

@Entity()
export class Prescription extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    // relations
    @ManyToOne(()=> MedicalRecord, (medical_record) => medical_record.prescriptions)
    medical_record: MedicalRecord

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}