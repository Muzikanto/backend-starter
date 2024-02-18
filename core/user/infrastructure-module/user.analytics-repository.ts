import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { UsersCountViewEntity } from '@core/user/db-adapter';

@Injectable()
export class UserAnalyticsRepository {
  constructor(@InjectDataSource() protected readonly dataSource: DataSource) {}

  getUsersCount(): Promise<UsersCountViewEntity | null> {
    return this.dataSource.getRepository(UsersCountViewEntity).createQueryBuilder().select().getOne();
  }
}
