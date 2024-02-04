import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { ExampleCreatedEvent } from '@core/example/domain';
import { LoggerService } from '@nestjs/common';
import { Logger } from '@packages/logger';

@EventsHandler(ExampleCreatedEvent)
export class ExampleCreatedHandler implements IEventHandler<ExampleCreatedEvent> {
  constructor(@Logger() protected readonly logger: LoggerService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle({ payload }: ExampleCreatedEvent) {
    //
  }
}
