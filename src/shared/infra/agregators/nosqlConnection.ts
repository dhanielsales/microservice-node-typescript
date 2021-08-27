import dbConfig from '@shared/config/db.config';
import { SqlDB } from '@model/sql';
import knex from 'knex';

let connection;

export const getDatabaseConnector = () => {
  return (): SqlDB => {
    if (!dbConfig) {
      throw new Error(`Failed to get configuration for env:${process.env.NODE_ENV}`);
    }
    connection = knex(dbConfig);
    return connection;
  };
};
