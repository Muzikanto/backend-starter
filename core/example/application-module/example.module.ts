import { DynamicModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ExampleInfrastructureModule } from '@core/example/infrastructure-module';
import { ExampleProxyModule } from '@core/example/proxy-module';
import { ExampleProxyController, ExampleTcpController } from '@core/example/application-module/controllers';

import { ExampleController } from './controllers/example.controller';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';

@Module({})
export class ExampleApplicationModule {
  public static forMonolith(): DynamicModule {
    return {
      module: ExampleApplicationModule,
      imports: [CqrsModule, ExampleInfrastructureModule],
      controllers: [ExampleController],
      providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
    };
  }

  public static forGateway(): DynamicModule {
    return {
      module: ExampleApplicationModule,
      imports: [CqrsModule, ExampleProxyModule],
      controllers: [ExampleProxyController],
    };
  }

  public static forMicroservice(): DynamicModule {
    return {
      module: ExampleApplicationModule,
      imports: [CqrsModule, ExampleInfrastructureModule],
      controllers: [ExampleTcpController],
      providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
    };
  }
}
