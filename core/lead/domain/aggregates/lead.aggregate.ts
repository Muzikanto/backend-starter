import { BadRequestException } from '@nestjs/common';
import { DomainBase } from '@packages/nest';
import { LeadCreatedEvent } from '../events';
import { ILead } from '../types/lead.types';

export class Lead extends DomainBase {
  constructor(public readonly entity: ILead) {
    super();
  }

  // ============= MAIN Methods =============

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(value: number): void {
    // update field
  }

  // ============= Asserts =============

  public assertCheck(): void {
    if (!this.entity) {
      throw new BadRequestException('test');
    }
  }

  // ============= Events =============

  public onCreate(): void {
    this.apply(new LeadCreatedEvent({ id: this.id }));
  }

  // getters

  get id() {
    return this.entity.id;
  }
}
