import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFeatureCommand } from '../impl/create-feature.command';
import { Feature } from '../../../domain';
import { FeatureRepository } from '../../../infrastructure-module';
import { FeatureEntity } from '../../../db-adapter';

@CommandHandler(CreateFeatureCommand)
export class CreateFeatureCommandHandler implements ICommandHandler<CreateFeatureCommand> {
  constructor(protected readonly featureRepository: FeatureRepository) {
    //
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute({ payload }: CreateFeatureCommand): Promise<Feature> {
    const feature = this.featureRepository.toDomain(new FeatureEntity({}));

    // save
    await this.featureRepository.save(feature);

    // commit
    feature.commit();

    return feature;
  }
}
