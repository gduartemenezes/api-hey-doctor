import { IsNotEmpty } from 'class-validator';
import { User } from 'src/modules/users/user.entity';

export class CreateDoctorWalletDto {
  @IsNotEmpty({
    message: 'Informe o médico',
  })
  doctor: User;
}
