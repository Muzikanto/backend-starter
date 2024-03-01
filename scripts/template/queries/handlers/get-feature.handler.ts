import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GetFeatureQuery } from '../impl/get-feature.query';

@CommandHandler(GetFeatureQuery)
export class CreateFeatureQueryHandler implements ICommandHandler<GetFeatureQuery> {
  constructor() {
    //
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute({ payload }: GetFeatureQuery): Promise<void> {
  }
}
