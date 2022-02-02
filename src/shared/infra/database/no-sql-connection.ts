import { MongoClient } from 'mongodb';

import dbConfig from '@shared/config/noSqlDb.config';
import { NoSqlConnection } from '@shared/model/noSql';
import AppLogger from '@shared/infra/agregators/AppLogger';

export async function getNoSqlDatabaseConnector(): Promise<NoSqlConnection> {
  if (!dbConfig) {
    throw new Error(`Failed to get No Sql configuration for env:${process.env.NODE_ENV}`);
  }

  const client = new MongoClient(dbConfig.url, dbConfig.options);
  const connection = await client.connect();

  new AppLogger({
    date: new Date(),
    message: 'Success when connected with Sql database.',
    type: 'INFO',
  });

  return connection;
}
