import { IGetExampleDto } from '../types/dto.types';
import { TransformID } from '@packages/nest';

export class GetExampleDto implements IGetExampleDto {
  @TransformID()
  exampleId!: string;
}
