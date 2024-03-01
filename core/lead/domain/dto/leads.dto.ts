import { IPaginatedResult, TransformInt, TransformObject } from '@packages/nest';
import { ILeadDto } from '../types/lead.dto.types';
import { LeadDto } from '@core/lead/domain';

export class LeadsDto<TDate = number> implements IPaginatedResult<ILeadDto<TDate>> {
  @TransformInt()
  count!: number;

  @TransformObject(LeadDto)
  rows!: ILeadDto<TDate>[];
}
