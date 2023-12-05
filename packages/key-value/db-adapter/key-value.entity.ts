import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IKeyValue } from '../domain/key-value.types';

@Entity({ name: 'key_value' })
export class KeyValueEntity<T extends object> implements IKeyValue<T> {
  constructor(data: Partial<KeyValueEntity<T>> = {}) {
    Object.assign(this, data);
  }

  @PrimaryColumn()
  id!: string;

  @Column({ type: 'json' })
  value!: T;
}
