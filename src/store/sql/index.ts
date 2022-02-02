import { SqlConnection } from '@model/sql';
import { ProductStore } from '@store/sql/product';
import { UserStore } from '@store/sql/user';

export class Sql {
  public readonly connection: SqlConnection;
  public readonly product: ProductStore;
  public readonly user: UserStore;

  constructor(connection: SqlConnection) {
    this.connection = connection;
    this.product = ProductStore.getInstance();
    this.user = UserStore.getInstance();
  }
}
