import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { UserClient } from './user.client';
import { createTcpProvider } from '@packages/client-api';

@Module({
  imports: [ClientsModule.registerAsync([createTcpProvider('GATEWAY')])],
  providers: [UserClient],
  exports: [UserClient],
})
export class UserProxyModule {}
