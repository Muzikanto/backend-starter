import { ICreateFeatureDto } from '../types/dto.types';
import { TransformInt } from '@packages/nest';

export class CreateFeatureDto implements ICreateFeatureDto {
  @TransformInt()
  value!: number;
}
