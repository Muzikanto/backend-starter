import { TestingModuleBuilder } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';

export function withMockDb(app: TestingModuleBuilder, dataSource: DataSource): TestingModuleBuilder {
  return app.overrideProvider(getDataSourceToken('default')).useValue(dataSource);
}
