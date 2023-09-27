import { IsNotEmpty, MaxLength, MinLength, IsDate } from 'class-validator';
import { PaymentMethod } from '../enums/payment-method.enum';
import { PaymentStatus } from '../enums/payment-status.enum';

export class CreatAppointmentDto {
  @IsNotEmpty({
    message: 'Informe o motivo da consulta',
  })
  @MaxLength(100, {
    message: 'O motivo da consulta deve ter no máximo 100 caracteres',
  })
  reason: string;

  @IsNotEmpty({
    message: 'Informe o paciente',
  })
  medical_record_id: string;

  @IsNotEmpty({
    message: 'Informe o médico',
  })
  doctor_wallet_id: string;

  @IsDate()
  @IsNotEmpty({
    message: 'Informe uma data válida',
  })
  schedule: Date;

  @IsNotEmpty({
    message: 'Informe o quadro do paciente',
  })
  @MinLength(400, {
    message: 'O motivo da consulta deve ter no máximo 400 caracteres',
  })
  observations: string;

  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
}
