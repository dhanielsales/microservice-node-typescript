import dbConfig from '@shared/config/sql.config';
import { SqlConnection } from '@model/sql';
import knex from 'knex';
import AppLogger from '@shared/infra/agregators/AppLogger';

let connection: SqlConnection;

export function getSqlConnector(): SqlConnection {
  if (!dbConfig) {
    throw new Error(`Failed to get Sql configuration for env:${process.env.NODE_ENV}`);
  }

  connection = knex(dbConfig);

  new AppLogger({
    date: new Date(),
    message: 'Success when connected with Sql database.',
    type: 'INFO',
  });

  return connection;
}
