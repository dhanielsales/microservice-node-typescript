import { NoSqlConnection } from "@model/noSql";
import { getSqlConnector } from "@shared/infra/database/sqlConnection";

import { PreferenceStore } from "@store/nosql/preference"

export class NoSql {
  private static instance: NoSql;
  public readonly connection: NoSqlConnection;
  public readonly preference: PreferenceStore;

  private constructor() {
    this.connection = getSqlConnector() // TODO Substituir por Implementação de coneção com NoSQL DB
    this.preference = PreferenceStore.getInstance()
  }

  static getInstance(): NoSql {
    if (!NoSql.instance) {
      NoSql.instance = new NoSql();
    }
    return NoSql.instance;
  }
}