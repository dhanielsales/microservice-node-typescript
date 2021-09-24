import { Sql } from '@store/sql';
import { NoSql } from '@store/nosql';

export class Store {
  private static instance: Store;
  public readonly sql: Sql;
  public readonly noSql: NoSql;

  private constructor() {
    this.sql = Sql.getInstance();
    this.noSql = NoSql.getInstance();
  }

  static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }
}
