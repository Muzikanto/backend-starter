import { BadRequestException } from '@nestjs/common';
import { ExampleCreatedEvent, IExample } from '@core/example/domain';
import { DomainBase } from '@packages/nest';

export class Example extends DomainBase {
  constructor(public readonly entity: IExample) {
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
    this.apply(new ExampleCreatedEvent({ id: this.id }));
  }

  // getters

  get id() {
    return this.entity.id;
  }
}
