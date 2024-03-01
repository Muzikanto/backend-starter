import { IGetLeadDto } from '../types/dto.types';
import { TransformID } from '@packages/nest';

export class GetLeadDto implements IGetLeadDto {
  @TransformID()
  leadId!: string;
}
