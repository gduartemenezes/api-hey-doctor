import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { PaymentMethod } from '../enums/payment-method.enum';
import { PaymentStatus } from '../enums/payment-status.enum';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsString({
    message: 'Informe um motivo válido',
  })
  reason: string;
  @IsOptional()
  @IsString({
    message: 'Informe um valor válido',
  })
  observations: string;

  @IsOptional()
  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;

  @IsOptional()
  @IsEnum(PaymentStatus)
  payment_status: PaymentStatus;

  @IsOptional()
  @IsDate()
  schedule: Date;
}
