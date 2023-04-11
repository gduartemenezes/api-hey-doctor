import { BaseEntity, Entity, Unique, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import { User } from "../users/user.entity";
@Entity()

export class MedicalReport extends BaseEntity {
    
    @ManyToOne(() => User)
    @JoinColumn()
    patient: User

    @PrimaryGeneratedColumn('uuid')
    id: string;


    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User)
    @JoinColumn()
    doctor: User

    


}