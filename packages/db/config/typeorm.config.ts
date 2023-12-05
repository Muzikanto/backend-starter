import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@packages/config/config.service';

@Injectable()
export class TypeormConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {
    //
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.getString('POSTGRES_HOST'),
      port: this.configService.getNumber('POSTGRES_PORT'),
      username: this.configService.getString('POSTGRES_USER'),
      password: this.configService.getString('POSTGRES_PASSWORD'),
      database: this.configService.getString('POSTGRES_DB'),
      synchronize: this.configService.getBoolean('DB_SYNCHRONIZE'),
      autoLoadEntities: true,
      // migrations: [/*...*/],
      schema: this.configService.getString('POSTGRES_SCHEMA'),
    };
  }
}
