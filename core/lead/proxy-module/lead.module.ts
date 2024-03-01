import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { LeadClient } from './lead.client';
import { createTcpProvider } from '@packages/client-api';

@Module({
  imports: [ClientsModule.registerAsync([createTcpProvider('GATEWAY')])],
  providers: [LeadClient],
  exports: [LeadClient],
})
export class LeadProxyModule {}
