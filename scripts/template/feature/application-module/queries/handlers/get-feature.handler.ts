import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetFeatureQuery } from '../impl';
import { FeatureRepository } from '../../../infrastructure-module';
import { Feature } from '../../../domain';

@QueryHandler(GetFeatureQuery)
export class GetFeatureHandler implements IQueryHandler<GetFeatureQuery> {
  constructor(protected readonly featureRepository: FeatureRepository) {}

  async execute({ payload }: GetFeatureQuery): Promise<Feature> {
    return this.featureRepository.getUnwrap(payload.id);
  }
}
