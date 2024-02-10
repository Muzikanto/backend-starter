import { EventBase } from '@packages/nest';

export class FeatureCreatedEvent extends EventBase {
  constructor(public readonly payload: { id: string }) {
    super();
  }
}
