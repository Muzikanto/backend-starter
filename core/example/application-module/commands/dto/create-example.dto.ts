import { ICreateExampleDto } from '../types/dto.types';
import { TransformInt } from '@packages/nest';

export class CreateExampleDto implements ICreateExampleDto {
  @TransformInt()
  value!: number;
}
