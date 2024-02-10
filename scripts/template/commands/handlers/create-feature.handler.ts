import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFeatureCommand } from '../impl/create-feature.command';

@CommandHandler(CreateFeatureCommand)
export class CreateFeatureCommandHandler implements ICommandHandler<CreateFeatureCommand> {
  constructor() {
    //
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute({ payload }: CreateFeatureCommand): Promise<void> {
  }
}
