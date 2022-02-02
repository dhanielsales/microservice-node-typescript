import { Sql } from '@store/sql';
import { NoSql } from '@store/nosql';
import { SqlConnection } from '@model/sql';
import { NoSqlConnection } from '@model/noSql';

interface StoreParams {
  sqlConnection: SqlConnection;
  noSqlConnection: NoSqlConnection;
}
export class Store {
  public readonly sql: Sql;
  public readonly noSql: NoSql;

  constructor(data: StoreParams) {
    this.sql = new Sql(data.sqlConnection);
    this.noSql = new NoSql(data.noSqlConnection);
  }
}
