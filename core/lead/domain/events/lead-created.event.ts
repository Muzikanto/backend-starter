import { EventBase } from '@packages/nest';

export class LeadCreatedEvent extends EventBase {
  constructor(public readonly payload: { id: string }) {
    super();
  }
}
