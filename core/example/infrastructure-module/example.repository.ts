import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { EventPublisher } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';

import { Example, ExampleMapper } from '../domain';
import { ExampleEntity } from '../db-adapter';
import { RepositoryBase } from '@packages/db';

@Injectable()
export class ExampleRepository extends RepositoryBase<Example, ExampleEntity> {
  constructor(@InjectDataSource() dataSource: DataSource, eventPublisher: EventPublisher) {
    super(ExampleMapper, eventPublisher, dataSource, ExampleEntity);
  }
}
