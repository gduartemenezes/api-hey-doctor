import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { DoctorWalletService } from '../doctor-wallet/doctor-wallet.service';
import { DoctorWalletRepository } from './doctor-wallet.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoctorWalletRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],

  providers: [DoctorWalletService, DoctorWalletRepository],
})
export class DoctorWalletModule {}
