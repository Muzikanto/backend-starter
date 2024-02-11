import { Injectable } from '@nestjs/common';
import { ICreateUserAuthTokenOptions } from '@core/auth/core/auth.types';
import { ConfigService } from '@packages/config';
import { JwtModuleOptions } from '@nestjs/jwt';

@Injectable()
export class AuthConfig implements ICreateUserAuthTokenOptions {
  public readonly secret: string;

  constructor(configService: ConfigService) {
    this.secret = configService.getString('AUTH_SECRET');
  }

  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    return {
      secret: this.secret,
      signOptions: { expiresIn: '60d' },
    };
  }
}
