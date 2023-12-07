import { DataType, newDb } from 'pg-mem';
import { DataSource } from 'typeorm';
import { v4 } from 'uuid';

export const getTestingDataSource = async () => {
  const db = newDb({
    autoCreateForeignKeyIndices: true,
  });

  db.public.registerFunction({
    implementation: () => 'test',
    name: 'current_database',
  });
  db.public.registerFunction({
    implementation: () => 'test',
    name: 'version',
  });
  db.public.registerFunction({
    implementation: (timestamp: number) => {
      return new Date(timestamp);
    },
    args: [DataType.timestamp],
    returns: DataType.date,
    name: 'date',
  });
  db.public.registerFunction({
    implementation: () => {
      return new Date().getTime();
    },
    args: [],
    returns: DataType.bool,
    name: 'rand',
  });
  db.public.registerFunction({
    implementation: () => {
      return new Date().getTime();
    },
    args: [],
    returns: DataType.bool,
    name: 'random',
  });

  db.registerExtension('uuid-ossp', (schema) => {
    schema.registerFunction({
      name: 'uuid_generate_v4',
      returns: DataType.uuid,
      implementation: v4,
      impure: true,
    });
  });

  const ds: DataSource = await db.adapters.createTypeormDataSource({
    type: 'postgres',
    entities: [],
    // autoLoadEntities: true,
  });
  await ds.initialize();
  await ds.synchronize();

  return ds;
};
