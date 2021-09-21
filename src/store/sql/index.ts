import { SqlConnection } from "@model/sql";
import { getSqlConnector } from "@shared/infra/database/sqlConnection";

import { ProductStore } from "@store/sql/product";
import { UserStore } from "@store/sql/user";

export class Sql {
  private static instance: Sql;
  public readonly connection: SqlConnection;
  public readonly product: ProductStore;
  public readonly user: UserStore;

  private constructor() {
    this.connection = getSqlConnector()
    this.product = ProductStore.getInstance()
    this.user = UserStore.getInstance()
  }

  static getInstance(): Sql {
    if (!Sql.instance) {
      Sql.instance = new Sql();
    }
    return Sql.instance;
  }
}