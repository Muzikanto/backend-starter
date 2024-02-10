import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { EventPublisher } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';

import { User, UserMapper } from '../domain';
import { UserEntity } from '../db-adapter';
import { RepositoryBase } from '@packages/db';

@Injectable()
export class UserRepository extends RepositoryBase<User, UserEntity> {
  constructor(@InjectDataSource() dataSource: DataSource, eventPublisher: EventPublisher) {
    super(UserMapper, eventPublisher, dataSource, UserEntity);
  }
}
