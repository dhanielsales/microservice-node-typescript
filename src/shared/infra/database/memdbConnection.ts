import RedisClient, { Redis } from 'ioredis';

import config from '@shared/config/memdb.config';
import AppLogger from '@shared/infra/agregators/AppLogger';

export async function getMemDbConnection(): Promise<Redis> {
  if (!config) {
    throw new Error(`Failed to get Cache configuration for env:${process.env.NODE_ENV}`);
  }

  const client = new RedisClient(config.port, config.host, config);

  client.on('connection', () => {
    new AppLogger({
      message: 'Success when connected with Cache database.',
      type: 'INFO',
    });
  });

  client.on('error', err => {
    new AppLogger({
      message: 'Error in connection from cache.',
      type: 'ERROR',
      error: err,
    });
  });

  return client;
}
