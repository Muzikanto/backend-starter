import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';
import { randomId } from '@packages/utils';

import { ILead } from '../domain';

@Entity({ name: 'lead' })
export class LeadEntity implements ILead {
  constructor(data: Omit<ILead, 'id' | 'createdAt'>) {
    Object.assign(this, data);
  }

  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: string = randomId();

  @Column({ type: 'varchar', length: 200 })
  name!: string;

  @Unique('uq-lead-email', ['email'])
  @Column({ type: 'varchar', length: 200 })
  email!: string;

  @Column({ type: 'varchar', length: 5000 })
  message!: string;

  @Column({ type: 'timestamp', default: 'now()' })
  createdAt: Date = new Date();
}
