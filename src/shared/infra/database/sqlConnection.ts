import dbConfig from '@shared/config/sqldb.config';
import { SqlConnection } from '@model/sql';
import knex from 'knex';
import AppLogger from '@shared/infra/agregators/AppLogger';

let connection: SqlConnection;

// TODO adicionar validação de conecção com o banco
export function getSqlConnector(): SqlConnection {
  if (connection) return connection
  if (!dbConfig) {
    throw new Error(`Failed to get Sql configuration for env:${process.env.NODE_ENV}`);
  }

  connection = knex(dbConfig);

  new AppLogger({
    message: 'Success when connected with Sql database.',
    type: 'INFO',
  });

  return connection;
}
