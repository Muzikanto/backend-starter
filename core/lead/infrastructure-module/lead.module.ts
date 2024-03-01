import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadEntity } from '../db-adapter';
import { LeadRepository } from './lead.repository';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([LeadEntity])],
  providers: [LeadRepository],
  exports: [LeadRepository],
})
export class LeadInfrastructureModule {}
