import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { PatientGender } from "./patient-gender.enum";

@Entity()
@Unique(['cpf'])
export class Patient extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false, type: 'varchar', length: 200})
    name: string;

    @Column({nullable: false, type: 'enum', enum: PatientGender, default: PatientGender.OTHER})
    gender: PatientGender;

    @Column({nullable: false, type: 'date'})
    birth_date: string;

    @Column({nullable: false, type: 'varchar', length: 11})
    cpf: string;

    @Column({nullable: false, type: 'varchar', length: 11})
    primary_contact: string;

    @Column({nullable: true, type: 'varchar', length: 11})
    secondary_contact: string;
    
    @Column({nullable: true, type: 'varchar', length: 200})
    address: string;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
    
}