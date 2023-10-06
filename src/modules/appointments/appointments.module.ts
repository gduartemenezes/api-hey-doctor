import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentRepository } from './appointment.repository';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { PassportModule } from '@nestjs/passport';
import { DoctorWalletService } from '../doctor-wallet/doctor-wallet.service';
import { PatientService } from '../patient/patient.service';
import { DoctorWalletModule } from '../doctor-wallet/doctor-wallet.module';
import { DoctorWalletRepository } from '../doctor-wallet/doctor-wallet.repository';
import { PatientRepository } from '../patient/patient.repository';

@Module({
  imports: [
    DoctorWalletModule,
    TypeOrmModule.forFeature([
      AppointmentRepository,
      DoctorWalletRepository,
      PatientRepository,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],

  providers: [
    AppointmentService,
    AppointmentRepository,
    DoctorWalletService,
    PatientService,
  ],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
