import { Sql } from '@model/sql';
import { getSqlConnector } from '@shared/infra/agregators/sqlConnection';

import { UserStore } from '@store/sql/user';
import { ProductStore } from '@store/sql/product';

export let currentStore: any = {};

export class Store {
  private readonly sql: Sql;

  constructor() {
    this.sql.connection = getSqlConnector();
    this.instanceStores();
  }

  Sql() {
    return this.sql;
  }

  private instanceStores() {
    const { connection } = this.sql;
    this.sql.user = new UserStore(connection);
    this.sql.product = new ProductStore(connection);
  }
}
