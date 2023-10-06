import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DoctorWallet } from './doctor-wallet.entity';
import { CreateDoctorWalletDto } from './dtos/create-doctor-wallet.dto';

@Injectable()
export class DoctorWalletRepository extends Repository<DoctorWallet> {
  constructor(private dataSource: DataSource) {
    super(DoctorWallet, dataSource.createEntityManager());
  }
  async createDoctorWallet(
    createDoctorWalletDto: CreateDoctorWalletDto,
  ): Promise<DoctorWallet> {
    const { doctor } = createDoctorWalletDto;
    const doctorWallet = new DoctorWallet();
    doctorWallet.doctor = doctor;
    try {
      await doctorWallet.save();
      return doctorWallet;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Já existe uma wallet para esse médico');
      } else {
        console.log(error);
        throw new InternalServerErrorException(
          'Erro ao salvar a wallet no banco de dados',
        );
      }
    }
  }
}
