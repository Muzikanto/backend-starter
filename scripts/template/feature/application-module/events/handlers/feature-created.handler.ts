import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { LoggerService } from '@nestjs/common';
import { Logger } from '@packages/logger';
import { FeatureCreatedEvent } from '../../../domain';

@EventsHandler(FeatureCreatedEvent)
export class FeatureCreatedHandler implements IEventHandler<FeatureCreatedEvent> {
  constructor(@Logger() protected readonly logger: LoggerService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle({ payload }: FeatureCreatedEvent) {
    //
  }
}
