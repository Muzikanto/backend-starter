import { IGetFeatureDto } from '../types/dto.types';
import { TransformID } from '@packages/nest';

export class GetFeatureDto implements IGetFeatureDto {
  @TransformID()
  featureId!: string;
}
