import { DynamicModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthConfig } from './auth.config';
import { CustomStrategy } from '@core/auth/core/strategies/custom-strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { IAuthModuleAsyncOptions } from '@core/auth/core/auth.types';

@Module({})
export class AuthModule {
  public static registerAsync(opts: IAuthModuleAsyncOptions): DynamicModule {
    return {
      global: true,
      module: AuthModule,
      imports: [PassportModule, JwtModule.registerAsync(opts)],
      providers: [AuthConfig, CustomStrategy, JwtService],
      exports: [JwtService],
    };
  }
}
