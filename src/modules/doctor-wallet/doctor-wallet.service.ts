import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorWallet } from './doctor-wallet.entity';
import { DoctorWalletRepository } from './doctor-wallet.repository';
import { CreateDoctorWalletDto } from './dtos/create-doctor-wallet.dto';

@Injectable()
export class DoctorWalletService {
  constructor(
    @InjectRepository(DoctorWalletRepository)
    private doctorWalletRepository: DoctorWalletRepository,
  ) {}

  async createDoctorWallet(
    createDoctorWalletDto: CreateDoctorWalletDto,
  ): Promise<DoctorWallet> {
    const doctorWallet = await this.doctorWalletRepository.createDoctorWallet(
      createDoctorWalletDto,
    );

    return doctorWallet;
  }

  async findById(id: string): Promise<DoctorWallet> {
    const doctorWallet = this.doctorWalletRepository.findOne({
      where: { id },
    });
    if (!doctorWallet) throw new NotFoundException('Não encontrado');
    return doctorWallet;
  }

  async deleteDoctorWallet(id: string): Promise<void> {
    const result = await this.doctorWalletRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Não foi encontrado com o ID informado');
    }
  }
}
