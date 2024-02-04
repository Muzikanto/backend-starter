import { Column, Entity, PrimaryColumn } from 'typeorm';
import { randomId } from '@packages/utils';

import { IExample } from '../domain';

@Entity({ name: 'example' })
export class ExampleEntity implements IExample {
  constructor(data: Omit<IExample, 'id' | 'createdAt'>) {
    Object.assign(this, data);
  }

  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: string = randomId();

  @Column({ type: 'timestamp', default: 'now()' })
  createdAt: Date = new Date();
}
