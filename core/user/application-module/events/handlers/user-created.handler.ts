import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { LoggerService } from '@nestjs/common';
import { Logger } from '@packages/logger';
import { UserCreatedEvent } from '../../../domain';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(@Logger() protected readonly logger: LoggerService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle({ payload }: UserCreatedEvent) {
    //
  }
}
