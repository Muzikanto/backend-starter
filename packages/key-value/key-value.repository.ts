import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { KeyValueEntity } from './db-adapter/key-value.entity';

@Injectable()
export class KeyValueRepository<T extends object> {
  private repo: Repository<KeyValueEntity<T>>;

  constructor(private dataSource: DataSource) {
    this.repo = this.dataSource.getRepository<KeyValueEntity<T>>(KeyValueEntity);
  }

  public async create(entity: KeyValueEntity<T>): Promise<void> {
    await this.repo.save(entity, { reload: false });
  }

  public async update(entity: KeyValueEntity<T>): Promise<void> {
    // eslint-disable-next-line
    await this.repo.update({ id: entity.id }, { value: entity.value as any });
  }

  public get(id: string): Promise<KeyValueEntity<T> | null> {
    return this.repo.findOne({ where: { id } });
  }
}
