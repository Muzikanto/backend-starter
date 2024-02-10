import { DynamicModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthController } from './controllers/auth.controller';

@Module({})
export class AuthApplicationModule {
  public static forMonolith(): DynamicModule {
    return {
      module: AuthApplicationModule,
      imports: [CqrsModule],
      controllers: [AuthController],
    };
  }
}
