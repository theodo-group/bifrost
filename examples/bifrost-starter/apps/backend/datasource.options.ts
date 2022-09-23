import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

// We define this const in a separate file from the datasource to avoid importing the datasource
// in the app because it's creating open handles in Jest
export const dataSourceOptions: PostgresConnectionOptions = {
  type: 'postgres',
  url: process.env.TYPEORM_URL,
  entities: (process.env.TYPEORM_ENTITIES as string).split(','),
  migrations: (process.env.TYPEORM_MIGRATIONS as string).split(','),
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  entityPrefix: process.env.TYPEORM_ENTITY_PREFIX,
};
