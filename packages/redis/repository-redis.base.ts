import { DomainBase, IMapper } from '../nest/ddd';
import { EventPublisher } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import Redis from 'ioredis';

// eslint-disable-next-line
export abstract class RepositoryRedisBase<Domain extends DomainBase<any>, Entity extends { id: string }> {
  protected constructor(
    protected readonly prefix: string,
    protected mapper: IMapper<any, any>,
    protected readonly eventPublisher: EventPublisher,
    protected readonly storage: Redis
  ) {
    //
  }

  public async save(domain: Domain & { id: string }): Promise<void> {
    const entity = this.mapper.toPersistence(domain);
    await this.storage.set(this.getCacheKey(domain.id), JSON.stringify(entity));
  }

  public async create(entity: Entity): Promise<Domain> {
    await this.storage.set(this.getCacheKey(entity.id), JSON.stringify(entity));

    return this.toDomain(entity);
  }

  public remove(id: string): void {
    this.storage.del(this.getCacheKey(id));
  }

  public async get(id: string): Promise<Domain | null> {
    const str = await this.storage.get(this.getCacheKey(id));

    return str ? this.toDomain(this.toEntity(str)) : null;
  }

  public async getUnwrap(id: string): Promise<Domain> {
    const item = await this.get(this.getCacheKey(id));

    if (!item) {
      throw new NotFoundException();
    }

    return item;
  }

  // utils

  public toDomain(entity: Entity): Domain {
    const domain = this.mapper.toDomain(entity);
    const domainWithCtx = this.eventPublisher.mergeObjectContext(domain);

    return domainWithCtx;
  }

  public getCacheKey(id: string): string {
    return this.prefix + id;
  }

  protected toEntity(str: string): Entity {
    return JSON.parse(str);
  }
}
