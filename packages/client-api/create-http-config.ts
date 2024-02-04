import { Provider } from '@nestjs/common';
import { ConfigService } from '@packages/config/config.service';

export type HttpOptions = {
  host: string;
  port: number;
  url: string;
};

export function getHttpConfigToken(key: string): string {
  return `HTTP_${key}_CONFIG`;
}

export function createHttpConfig(key: string): Provider {
  return {
    provide: getHttpConfigToken(key),
    useFactory: (configService: ConfigService): HttpOptions => {
      const host = configService.getString(`HTTP_${key}_HOST`);
      const port = configService.getNumber(`HTTP_${key}_PORT`);

      return {
        host,
        port,
        url: `${host}:${port}`,
      };
    },
    inject: [ConfigService],
  };
}
