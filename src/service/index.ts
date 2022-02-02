import { Store } from '@store/store';
import { Comms } from 'comm/comms';
import { Api } from '@api/api';
import { Cache } from '@shared/infra/agregators/Cache';
import { App } from '@app/app';

import { getSqlDatabaseConnector } from '@shared/infra/database/sql-connection';
import { getNoSqlDatabaseConnector } from '@shared/infra/database/no-sql-connection';

export class Service {
  private static instance: Service;
  private store: Store;
  private comms: Comms;
  private cache: Cache;
  private api: Api;
  private app: App;

  static getInstance(): Service {
    if (!Service.instance) {
      Service.instance = new Service();
    }
    return Service.instance;
  }

  async start(): Promise<void> {
    // Store configures
    const sqlConnection = await getSqlDatabaseConnector();
    const noSqlConnection = await getNoSqlDatabaseConnector();

    this.store = new Store({
      noSqlConnection,
      sqlConnection,
    });

    // Communication configures
    this.comms = new Comms();

    // Cache configures
    this.cache = new Cache();

    // Api configures
    this.api = new Api();

    // App configures
    this.app = new App();

    return await this.api.startServer();
  }

  public getStore(): Store {
    return this.store;
  }

  public getComms(): Comms {
    return this.comms;
  }

  public getCache(): Cache {
    return this.cache;
  }

  public getApi(): Api {
    return this.api;
  }

  public getApp(): App {
    return this.app;
  }
}
