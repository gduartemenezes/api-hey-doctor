import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { PatientGender } from '../enums/patient-gender.enum';
import { PatientOrigin } from '../enums/patient-origin.enum';

export class UpdatePatientDto {
  @IsOptional()
  @IsNotEmpty({
    message: 'Informe o nome do paciente',
  })
  @MaxLength(100, {
    message: 'O nome do paciente deve ter no máximo 100 caracteres',
  })
  name: string;
  @IsOptional()
  @IsNotEmpty({
    message: 'Informe o um email para contato',
  })
  @IsEmail()
  email: string;
  @IsOptional()
  @IsNotEmpty({
    message: 'Informe o informe o número de documento do paciente',
  })
  @MaxLength(11, {
    message: 'O documento do paciente deve ter no máximo 11 caracteres',
  })
  cpf: string;
  @IsOptional()
  @IsNotEmpty({
    message: 'Informe o um número para contato',
  })
  @MaxLength(11, {
    message: 'O número para contato deve ter no máximo 11 caracteres',
  })
  primary_contact: string;
  @IsOptional()
  @MaxLength(11, {
    message: 'O número para contato deve ter no máximo 11 caracteres',
  })
  secondary_contact: string;
  @IsOptional()
  @IsNotEmpty({
    message: 'Informe o gênero do paciente',
  })
  @IsEnum(PatientGender)
  gender: PatientGender;
  @IsOptional()
  @IsNotEmpty({
    message: 'Informe como o paciente soube do serviço',
  })
  @IsEnum(PatientOrigin)
  origin: PatientOrigin;
  @IsOptional()
  @IsDate()
  @IsNotEmpty({
    message: 'Informe uma data válida',
  })
  birth_date: Date;
  @IsOptional()
  @IsNotEmpty({
    message: 'Informe o endereço do paciente',
  })
  @MaxLength(100, {
    message: 'O endereço do paciente deve ter no máximo 100 caracteres',
  })
  address: string;
}
