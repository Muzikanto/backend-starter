import { DynamicModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { FeatureController } from './controllers/feature.controller';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { FeatureInfrastructureModule } from '../infrastructure-module';
import { FeatureProxyModule } from '../proxy-module';
import { FeatureProxyController, FeatureTcpController } from './controllers';

@Module({})
export class FeatureApplicationModule {
  public static forMonolith(): DynamicModule {
    return {
      module: FeatureApplicationModule,
      imports: [CqrsModule, FeatureInfrastructureModule],
      controllers: [FeatureController],
      providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
    };
  }

  public static forGateway(): DynamicModule {
    return {
      module: FeatureApplicationModule,
      imports: [CqrsModule, FeatureProxyModule],
      controllers: [FeatureProxyController],
    };
  }

  public static forMicroservice(): DynamicModule {
    return {
      module: FeatureApplicationModule,
      imports: [CqrsModule, FeatureInfrastructureModule],
      controllers: [FeatureTcpController],
      providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
    };
  }
}
