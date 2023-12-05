import { Global, Module } from '@nestjs/common';
import { KeyValueService } from './key-value.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyValueRepository } from './key-value.repository';
import { KeyValueEntity } from './db-adapter/key-value.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([KeyValueEntity])],
  providers: [KeyValueService, KeyValueRepository],
  exports: [KeyValueService],
})
export class KeyValueModule {}
