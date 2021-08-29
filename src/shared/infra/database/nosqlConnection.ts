import dbConfig from '@shared/config/sql.config';
import { SqlConnection } from '@model/sql';
import knex from 'knex';

let connection;

export const getDatabaseConnector = () => {
  return (): SqlConnection => {
    if (!dbConfig) {
      throw new Error(`Failed to get configuration for env:${process.env.NODE_ENV}`);
    }
    connection = knex(dbConfig);
    return connection;
  };
};
