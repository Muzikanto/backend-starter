import { ConsoleLogger } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService as NestConfigService } from '@nestjs/config';

// Fix tls error for node 12+
// eslint-disable-next-line
require('tls').DEFAULT_MIN_VERSION = 'TLSv1';

process.on('uncaughtException', (err) => {
  logger.error(`Caught exception: ${err}`);

  process.exit(1);
});

const logger = new ConsoleLogger();

export async function runMigration(opts: { migrations: string }) {
  const nestConfigService = new NestConfigService();

  logger.log(`start migration in ${nestConfigService.get('POSTGRES_HOST')}`);

  const dbOptions: DataSourceOptions = {
    type: 'postgres',
    host: nestConfigService.get('POSTGRES_HOST'),
    port: nestConfigService.get('POSTGRES_PORT'),
    username: nestConfigService.get('POSTGRES_USER'),
    password: nestConfigService.get('POSTGRES_PASSWORD'),
    database: nestConfigService.get('POSTGRES_DB'),
    schema: nestConfigService.get('POSTGRES_SCHEMA'),
    migrations: [opts.migrations],
  };

  const db = new DataSource(dbOptions);
  await db.initialize();

  if (!db) {
    throw new Error('Not found connect to db');
  }

  try {
    if (process.argv.includes('revert')) {
      await db.undoLastMigration({ transaction: 'all' });

      logger.log('Revert last migration complete');
    } else {
      const result = await db.runMigrations({ transaction: 'all' });

      logger.log('Run migrations:');
      logger.log(
        `[${result.length > 0 ? '\n ' : ''}${result.map((el) => el.name).join(', ')}${result.length > 0 ? '\n' : ''}]`
      );
    }

    await db.close();
  } catch (e) {
    // await db.undoLastMigration({ transaction: 'all' });
    await db.close();

    console.log(e);
    logger.error(e);
    process.exit(1);
  }
}
