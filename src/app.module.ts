import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './configs/winston.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from './configs/mailer.config';
import { PatientModule } from './modules/patient/patient.module';
import { DoctorWalletModule } from './modules/doctor-wallet/doctor-wallet.module';
import { AppointmentModule } from './modules/appointments/appointments.module';
import { DiseasesModule } from './modules/diseases/diseases.module';
import { Prescription } from './modules/prescriptions/prescriptions.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    WinstonModule.forRoot(winstonConfig),
    MailerModule.forRoot(mailerConfig),
    UsersModule,
    AuthModule,
    PatientModule,
    DoctorWalletModule,
    AppointmentModule,
    DiseasesModule,
    Prescription,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
