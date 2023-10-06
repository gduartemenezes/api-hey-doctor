import { IsNotEmpty } from 'class-validator';
import { Patient } from 'src/modules/patient/patient.entity';

export class CreateMedicalRecordDto {
  @IsNotEmpty({
    message: 'Informe o paciente',
  })
  patient: Patient;
}
