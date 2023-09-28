import {
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsDate,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { PatientGender } from '../enums/patient-gender.enum';
import { PatientOrigin } from '../enums/patient-origin.enum';

export class CreatePatientDto {
  @IsNotEmpty({
    message: 'Informe o nome do paciente',
  })
  @MaxLength(100, {
    message: 'O nome do paciente deve ter no máximo 100 caracteres',
  })
  name: string;

  @IsNotEmpty({
    message: 'Informe o um email para contato',
  })
  @IsEmail()
  email: string;

  @IsNotEmpty({
    message: 'Informe o informe o número de documento do paciente',
  })
  @MaxLength(11, {
    message: 'O documento do paciente deve ter no máximo 11 caracteres',
  })
  cpf: string;

  @IsNotEmpty({
    message: 'Informe o um número para contato',
  })
  @MaxLength(11, {
    message: 'O número para contato deve ter no máximo 11 caracteres',
  })
  primary_contact: string;

  @MaxLength(11, {
    message: 'O número para contato deve ter no máximo 11 caracteres',
  })
  secondary_contact: string;

  @IsNotEmpty({
    message: 'Informe o gênero do paciente',
  })
  @IsEnum(PatientGender)
  gender: PatientGender;

  @IsNotEmpty({
    message: 'Informe como o paciente soube do serviço',
  })
  @IsEnum(PatientOrigin)
  origin: PatientOrigin;

  @IsDate()
  @IsNotEmpty({
    message: 'Informe uma data válida',
  })
  birth_date: Date;

  @IsNotEmpty({
    message: 'Informe o endereço do paciente',
  })
  @MaxLength(100, {
    message: 'O endereço do paciente deve ter no máximo 100 caracteres',
  })
  address: string;
}
