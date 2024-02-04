import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateExampleCommand } from '@core/example/application-module/commands/impl';
import { ExampleRepository } from '@core/example/infrastructure-module';
import { Example } from '@core/example/domain';
import { ExampleEntity } from '@core/example/db-adapter';

@CommandHandler(CreateExampleCommand)
export class CreateExampleCommandHandler implements ICommandHandler<CreateExampleCommand> {
  constructor(protected readonly exampleRepository: ExampleRepository) {
    //
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute({ payload }: CreateExampleCommand): Promise<Example> {
    const example = this.exampleRepository.toDomain(new ExampleEntity({}));

    // save
    await this.exampleRepository.save(example);

    // commit
    example.commit();

    return example;
  }
}
