import { Injectable } from '@nestjs/common';
import { KeyValueRepository } from './key-value.repository';
import { KeyValueEntity } from './db-adapter/key-value.entity';

@Injectable()
export class KeyValueService {
  constructor(private readonly repo: KeyValueRepository<any>) {
    //
  }

  public async get<T extends object>(id: string): Promise<T | undefined> {
    const entity = await this.repo.get(id);

    return entity?.value;
  }

  public async getOrCreate<T extends object>(id: string, defaultState: T): Promise<T> {
    const entity = await this.repo.get(id);

    if (!entity) {
      const newEntity = new KeyValueEntity<T>();
      newEntity.id = id;
      newEntity.value = defaultState;

      await this.repo.create(newEntity);

      return newEntity.value;
    }

    // refresh if no value
    let isNeedRefresh = false;
    for (const k in defaultState) {
      if (!(k in entity.value)) {
        entity.value[k] = defaultState[k];
        isNeedRefresh = true;
      }
    }
    if (isNeedRefresh) {
      await this.repo.update(entity);
    }

    return entity.value;
  }

  public async set<T extends object>(id: string, value: T): Promise<void> {
    const entity = await this.repo.get(id);

    if (!entity) {
      const newEntity = new KeyValueEntity<T>();
      newEntity.id = id;
      newEntity.value = value;

      await this.repo.create(newEntity);

      return;
    } else {
      entity.value = value;
    }

    await this.repo.update(entity);
  }
}
