import { BadRequestException } from '@nestjs/common';
import { DomainBase } from '@packages/nest';
import { FeatureCreatedEvent } from '../events';
import { IFeature } from '../types/feature.types';

export class Feature extends DomainBase {
  constructor(public readonly entity: IFeature) {
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
    this.apply(new FeatureCreatedEvent({ id: this.id }));
  }

  // getters

  get id() {
    return this.entity.id;
  }
}
