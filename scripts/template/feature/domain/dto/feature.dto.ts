import { TransformDate, TransformID } from '@packages/nest';
import { IFeatureDto } from '../types/feature.dto.types';

export class FeatureDto<TDate = number> implements IFeatureDto<TDate> {
  @TransformID()
  id!: string;

  @TransformDate()
  createdAt!: TDate;
}
