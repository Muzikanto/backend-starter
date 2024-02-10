import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureEntity } from '../db-adapter';
import { FeatureRepository } from './feature.repository';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([FeatureEntity])],
  providers: [FeatureRepository],
  exports: [FeatureRepository],
})
export class FeatureInfrastructureModule {}
