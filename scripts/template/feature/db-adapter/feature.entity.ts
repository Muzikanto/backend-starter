import { Column, Entity, PrimaryColumn } from 'typeorm';
import { randomId } from '@packages/utils';

import { IFeature } from '../domain';

@Entity({ name: 'feature' })
export class FeatureEntity implements IFeature {
  constructor(data: Omit<IFeature, 'id' | 'createdAt'>) {
    Object.assign(this, data);
  }

  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: string = randomId();

  @Column({ type: 'timestamp', default: 'now()' })
  createdAt: Date = new Date();
}
