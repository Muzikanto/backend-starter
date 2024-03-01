import { TransformDate, TransformID, TransformString } from '@packages/nest';
import { ILeadDto } from '../types/lead.dto.types';

export class LeadDto<TDate = number> implements ILeadDto<TDate> {
  @TransformID()
  id!: string;

  @TransformString()
  name!: string;

  @TransformString()
  email!: string;

  @TransformString()
  message!: string;

  @TransformDate()
  createdAt!: TDate;
}
