import { ICreateLeadDto } from '../types/dto.types';
import { TransformInt, TransformString } from '@packages/nest';

export class CreateLeadDto implements ICreateLeadDto {
  @TransformString()
  name!: string;

  @TransformString()
  email!: string;

  @TransformString()
  message!: string;
}
