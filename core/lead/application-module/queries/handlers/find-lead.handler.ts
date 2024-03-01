import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FindLeadQuery, GetLeadQuery } from '../impl';
import { LeadRepository } from '../../../infrastructure-module';
import { Lead } from '../../../domain';
import { IPaginatedResult } from '@packages/nest';

@QueryHandler(FindLeadQuery)
export class FindLeadQueryHandler implements IQueryHandler<FindLeadQuery> {
  constructor(protected readonly leadRepository: LeadRepository) {}

  async execute({ payload }: FindLeadQuery): Promise<IPaginatedResult<Lead>> {
    return this.leadRepository.findAndCount(payload);
  }
}
