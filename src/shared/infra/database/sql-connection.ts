import dbConfig from '@shared/config/sqldb.config';
import { SqlConnection } from '@model/sql';
import knex from 'knex';
import AppLogger from '@shared/infra/agregators/AppLogger';

export function getSqlDatabaseConnector(): SqlConnection {
  if (!dbConfig) {
    throw new Error(`Failed to get Sql configuration for env:${process.env.NODE_ENV}`);
  }

  const connection = knex(dbConfig);

  new AppLogger({
    date: new Date(),
    message: 'Success when connected with Sql database.',
    type: 'INFO',
  });

  return connection;
}
