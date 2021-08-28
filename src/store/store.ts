import { Sql } from '@model/sql';
import { getSqlConnector } from '@shared/infra/database/sqlConnection';

import { UserStore } from '@store/sql/user';
import { ProductStore } from '@store/sql/product';

export class Store {
  private readonly sql: Sql;

  constructor() {
    const connection = getSqlConnector();
    this.sql = {
      Connection: connection,
      UserStore: new UserStore(connection),
      ProductStore: new ProductStore(connection),
    };
  }

  Sql() {
    return this.sql;
  }
}
