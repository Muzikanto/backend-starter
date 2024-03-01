import { DomainBase, IMapper, IPaginatedResult } from '../../nest/ddd';
import { DataSource, EntityManager, EntityTarget, ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { EventPublisher } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';

// eslint-disable-next-line
export abstract class RepositoryBase<
  Domain extends DomainBase<{ id: string }>,
  Entity extends ObjectLiteral & { id: string }
> {
  protected repo: Repository<Entity>;

  protected constructor(
    protected readonly mapper: IMapper<any, any>,
    protected readonly eventPublisher: EventPublisher,
    protected readonly dataSource: DataSource,
    protected readonly entity: EntityTarget<Entity>
  ) {
    this.repo = this.dataSource.getRepository(this.entity);
  }

  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  public async get(id: string | number, opts?: any): Promise<Domain | null> {
    // eslint-disable-next-line
    const entity = await this.repo.findOne({ where: { id: String(id) } as any });

    return entity ? this.toDomain(entity) : null;
  }

  public async getUnwrap(id: string, opts?: any): Promise<Domain> {
    const item = await this.get(id, opts);

    if (!item) {
      throw new NotFoundException('not found entity');
    }

    return item;
  }

  public async findByIds(ids: string[]): Promise<Domain[]> {
    const qb = this.repo.createQueryBuilder('entity').where('entity.id in (:...ids)', { ids: ids });

    const arr = await qb.getMany();

    return arr.map((el) => this.toDomain(el));
  }

  public async findByIdsUnwrap(ids: string[]): Promise<Domain[]> {
    const rows = await this.findByIds(ids);
    const mapIds = ids.reduce((acc, id) => ({ ...acc, [id]: true }), {});

    rows.forEach((row) => {
      delete mapIds[(row as any).id];
    });

    if (Object.keys(mapIds).length > 0) {
      throw new NotFoundException('not found one of entity');
    }

    return rows;
  }

  public async save(domain: Domain, opts: { repo?: Repository<Entity>; manager?: EntityManager } = {}): Promise<void> {
    const repo = opts.manager ? opts.manager.getRepository(this.entity) : this.repo;

    await repo.save(this.mapper.toPersistence(domain), {
      reload: false,
    });
  }

  public async saveMany(domains: Domain[], opts: { manager?: EntityManager } = {}): Promise<void> {
    const repo = opts.manager ? opts.manager.getRepository(this.entity) : this.repo;

    await repo.save(domains.map((el) => this.mapper.toPersistence(el)));
  }

  public async update(
    domain: Domain & { id: string },
    fields: Array<keyof Entity>,
    opts: { manager?: EntityManager } = {}
  ): Promise<void> {
    const repo = opts.manager ? opts.manager.getRepository(this.entity) : this.repo;
    const entity = this.mapper.toPersistence(domain);
    const part = fields
      .map((field) => ({ field, data: entity[field] }))
      .reduce((acc, el) => ({ ...acc, [el.field]: el.data }), {});

    await repo.createQueryBuilder().update().where('id = :id', { id: domain.id }).set(part).execute();
  }

  public async incrementNumbers(
    id: string,
    fields: { [k in keyof Entity]?: number },
    opts: { manager?: EntityManager } = {}
  ): Promise<void> {
    const repo = opts.manager ? opts.manager.getRepository(this.entity) : this.repo;
    const part = Object.keys(fields)
      .filter((k) => typeof fields[k] !== 'undefined')
      .reduce(
        (acc, k) => ({
          ...acc,
          [k]: () => `"${k}" ${(fields[k] as number) >= 0 ? '+' : '-'} ${Math.abs(fields[k] as number)}`,
        }),
        {}
      );

    await repo.createQueryBuilder().update().where('id = :id', { id }).set(part).execute();
  }

  public async find(opts: { limit: number; offset?: number }): Promise<Domain[]> {
    const qb = this.repo.createQueryBuilder('row');

    const arr = await qb
      .take(opts.limit)
      .skip(opts.offset || 0)
      .getMany();

    return arr.map((el) => this.toDomain(el));
  }

  public async findAndCount(opts: { limit: number; offset?: number }): Promise<IPaginatedResult<Domain>> {
    const qb = this.repo.createQueryBuilder('row');

    const [arr, count] = await qb
      .take(opts.limit)
      .skip(opts.offset || 0)
      .getManyAndCount();

    return { rows: arr.map((el) => this.toDomain(el)), count };
  }

  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  public async total(opts?: any): Promise<number> {
    return this.repo.count();
  }

  //

  protected getSelectQueryBuilder(alias?: string): SelectQueryBuilder<Entity> {
    return this.repo.createQueryBuilder(alias);
  }

  public toDomain(entity: Entity): Domain {
    const domain = this.mapper.toDomain(entity);
    const domainWithCtx = this.eventPublisher.mergeObjectContext(domain);

    return domainWithCtx;
  }
}
