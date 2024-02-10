import { EventBase } from '@packages/nest';

export class UserCreatedEvent extends EventBase {
  constructor(public readonly payload: { id: string }) {
    super();
  }
}
