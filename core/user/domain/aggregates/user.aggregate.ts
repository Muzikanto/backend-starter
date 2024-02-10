import { BadRequestException } from '@nestjs/common';
import { DomainBase } from '@packages/nest';
import { UserCreatedEvent } from '../events';
import { IUser } from '../types/user.types';

export class User extends DomainBase {
  constructor(public readonly entity: IUser) {
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
    this.apply(new UserCreatedEvent({ id: this.id }));
  }

  // getters

  get id() {
    return this.entity.id;
  }
}
