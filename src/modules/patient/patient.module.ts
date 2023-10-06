import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientRepository } from './patient.repository';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([PatientRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],

  providers: [PatientService, PatientRepository],
  controllers: [PatientController],
})
export class PatientModule {}
