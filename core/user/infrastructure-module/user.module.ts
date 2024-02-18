import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, UsersCountViewEntity } from '../db-adapter';
import { UserRepository } from './user.repository';
import { UserAnalyticsRepository } from '@core/user/infrastructure-module/user.analytics-repository';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserEntity, UsersCountViewEntity])],
  providers: [UserRepository, UserAnalyticsRepository],
  exports: [UserRepository, UserAnalyticsRepository],
})
export class UserInfrastructureModule {}
