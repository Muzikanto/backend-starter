import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { FeatureClient } from './feature.client';
import { createTcpProvider } from '@packages/client-api';

@Module({
  imports: [ClientsModule.registerAsync([createTcpProvider('GATEWAY')])],
  providers: [FeatureClient],
  exports: [FeatureClient],
})
export class FeatureProxyModule {}
