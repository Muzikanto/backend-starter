import { ConfigService } from '@packages/config/config.service';
import { Injectable } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

@Injectable()
export class AppConfig {
  public readonly id: string;
  public readonly name: string;
  public readonly isProduction: boolean;
  public readonly mode: string;
  public readonly cors?: CorsOptions;

  constructor(configService: ConfigService) {
    this.id = configService.getString('APP_ID');
    this.name = configService.getString('APP_NAME');
    this.isProduction = configService.getString('NODE_ENV') === 'production';
    this.mode = configService.getString('NODE_ENV');

    const corsOrigin = configService.getRaw('CORS_ORIGIN') || '*';

    this.cors = {
      origin: corsOrigin,
      credentials: true,
      methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'PATCH', 'DELETE'],
    };
  }
}
