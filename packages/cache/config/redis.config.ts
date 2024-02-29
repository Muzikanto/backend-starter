import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ConfigService } from '@packages/config/config.service';
import { RedisModuleOptions, RedisOptionsFactory } from '@liaoliaots/nestjs-redis';

@Injectable()
export class RedisConfig implements RedisOptionsFactory {
  public readonly host: string;
  public readonly port: number;
  public readonly user: string;
  public readonly password: string;
  protected readonly logger = new ConsoleLogger('Redis');

  constructor(configService: ConfigService) {
    this.host = configService.getString('REDIS_HOST');
    this.port = configService.getNumber('REDIS_PORT');
    this.user = configService.getString('REDIS_USER');
    this.password = configService.getString('REDIS_PASSWORD');
  }

  async createRedisOptions(): Promise<RedisModuleOptions> {
    const url = `redis://:${this.password}@${this.host}:${this.port}`;

    return {
      config: {
        namespace: 'default',
        url,
        onClientCreated: (client) => {
          client.on('error', (err) => {
            this.logger.error(err.message);
          });
          client.on('ready', () => {
            this.logger.log(`${this.host}:${this.port} ready`);
          });
        },
      },
    };
  }
}
