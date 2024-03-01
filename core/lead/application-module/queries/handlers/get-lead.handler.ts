import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetLeadQuery } from '../impl';
import { LeadRepository } from '../../../infrastructure-module';
import { Lead } from '../../../domain';

@QueryHandler(GetLeadQuery)
export class GetLeadHandler implements IQueryHandler<GetLeadQuery> {
  constructor(protected readonly leadRepository: LeadRepository) {}

  async execute({ payload }: GetLeadQuery): Promise<Lead> {
    return this.leadRepository.getUnwrap(payload.id);
  }
}
