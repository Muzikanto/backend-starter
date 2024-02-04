import { EventBase } from '@packages/nest';

export class ExampleCreatedEvent extends EventBase {
  constructor(public readonly payload: { id: string }) {
    super();
  }
}
