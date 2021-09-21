import { Redis } from 'ioredis';
import { getMemDbConnection } from '@shared/infra/database/memdbConnection';

import { Cache as CacheInterface } from '@model/cache';

// export class Cache {
//   private memDb: Redis;

//   constructor() {
//     this.createMemDbConnection();
//   }

//   public getInstance(): CacheInterface {
//     return this.memDb as CacheInterface;
//   }

//   private async createMemDbConnection(): Promise<Redis> {
//     return await getMemDbConnection();
//   }
// }

export class Cache {
  private static instance: Cache;
  private constructor() { }

  static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache();
    }
    return Cache.instance;
  }
}