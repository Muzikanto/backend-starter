import { DynamicModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserController } from './controllers/user.controller';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { UserInfrastructureModule } from '../infrastructure-module';
import { UserProxyModule } from '../proxy-module';
import { UserProxyController, UserTcpController } from './controllers';

@Module({})
export class UserApplicationModule {
  public static forMonolith(): DynamicModule {
    return {
      module: UserApplicationModule,
      imports: [CqrsModule, UserInfrastructureModule],
      controllers: [UserController],
      providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
    };
  }

  public static forGateway(): DynamicModule {
    return {
      module: UserApplicationModule,
      imports: [CqrsModule, UserProxyModule],
      controllers: [UserProxyController],
    };
  }

  public static forMicroservice(): DynamicModule {
    return {
      module: UserApplicationModule,
      imports: [CqrsModule, UserInfrastructureModule],
      controllers: [UserTcpController],
      providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
    };
  }
}
