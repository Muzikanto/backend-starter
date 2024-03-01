import { DynamicModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { LeadController } from './controllers/lead.controller';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { LeadInfrastructureModule } from '../infrastructure-module';
import { LeadProxyModule } from '../proxy-module';
import { LeadProxyController, LeadTcpController } from './controllers';

@Module({})
export class LeadApplicationModule {
  public static forMonolith(): DynamicModule {
    return {
      module: LeadApplicationModule,
      imports: [CqrsModule, LeadInfrastructureModule],
      controllers: [LeadController],
      providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
    };
  }

  public static forGateway(): DynamicModule {
    return {
      module: LeadApplicationModule,
      imports: [CqrsModule, LeadProxyModule],
      controllers: [LeadProxyController],
    };
  }

  public static forMicroservice(): DynamicModule {
    return {
      module: LeadApplicationModule,
      imports: [CqrsModule, LeadInfrastructureModule],
      controllers: [LeadTcpController],
      providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
    };
  }
}
