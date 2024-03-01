import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { EventPublisher } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';

import { Lead, LeadMapper } from '../domain';
import { LeadEntity } from '../db-adapter';
import { RepositoryBase } from '@packages/db';

@Injectable()
export class LeadRepository extends RepositoryBase<Lead, LeadEntity> {
  constructor(@InjectDataSource() dataSource: DataSource, eventPublisher: EventPublisher) {
    super(LeadMapper, eventPublisher, dataSource, LeadEntity);
  }
}
