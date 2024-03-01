import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { LoggerService } from '@nestjs/common';
import { Logger } from '@packages/logger';
import { LeadCreatedEvent } from '../../../domain';

@EventsHandler(LeadCreatedEvent)
export class LeadCreatedHandler implements IEventHandler<LeadCreatedEvent> {
  constructor(@Logger() protected readonly logger: LoggerService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle({ payload }: LeadCreatedEvent) {
    //
  }
}
