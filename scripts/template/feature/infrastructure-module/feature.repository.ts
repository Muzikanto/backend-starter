import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { EventPublisher } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';

import { Feature, FeatureMapper } from '../domain';
import { FeatureEntity } from '../db-adapter';
import { RepositoryBase } from '@packages/db';

@Injectable()
export class FeatureRepository extends RepositoryBase<Feature, FeatureEntity> {
  constructor(@InjectDataSource() dataSource: DataSource, eventPublisher: EventPublisher) {
    super(FeatureMapper, eventPublisher, dataSource, FeatureEntity);
  }
}
