import { ConfigService } from '@packages/config/config.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfig {
  public readonly id: string;
  public readonly name: string;
  public readonly isProduction: boolean;
  public readonly mode: string;

  constructor(configService: ConfigService) {
    this.id = configService.getString('APP_ID');
    this.name = configService.getString('APP_NAME');
    this.isProduction = configService.getString('NODE_ENV') === 'production';
    this.mode = configService.getString('NODE_ENV');
  }
}
