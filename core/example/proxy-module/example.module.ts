import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { ExampleClient } from './example.client';
import { createTcpProvider } from '@packages/client-api';

@Module({
  imports: [ClientsModule.registerAsync([createTcpProvider('GATEWAY')])],
  providers: [ExampleClient],
  exports: [ExampleClient],
})
export class ExampleProxyModule {}
