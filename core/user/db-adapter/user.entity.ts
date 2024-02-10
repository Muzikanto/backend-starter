import { Column, Entity, PrimaryColumn } from 'typeorm';
import { randomId } from '@packages/utils';

import { IUser } from '../domain';

@Entity({ name: 'user' })
export class UserEntity implements IUser {
  constructor(data: Omit<IUser, 'id' | 'createdAt'>) {
    Object.assign(this, data);
  }

  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: string = randomId();

  @Column({ type: 'timestamp', default: 'now()' })
  createdAt: Date = new Date();
}
