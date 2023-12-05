import { AggregateRoot as BaseAggregateRoot } from '@nestjs/cqrs';

// eslint-disable-next-line
export abstract class DomainBase<T = any> extends BaseAggregateRoot {}
