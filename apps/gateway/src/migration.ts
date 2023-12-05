import dotenv from 'dotenv';
import path from 'path';
import { runMigration } from '@packages/db/utils';

const isProduction = process.env.NODE_ENV === 'production';
const envPath = path.resolve(`./apps/gateway/.env${isProduction ? '' : '.local'}`);
dotenv.config({ path: envPath });

const folder = 'packages/db/migrations';

runMigration({
  migrations: !isProduction ? path.resolve(`${folder}/*.ts`) : path.resolve(`dist/${folder}/*.js`),
}).then(() => process.exit(0));
