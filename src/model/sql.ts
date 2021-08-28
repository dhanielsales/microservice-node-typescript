import { ProductStore } from '@store/sql/product';
import { UserStore } from '@store/sql/user';
import { Knex } from 'knex';

export type SqlConnection = Knex<any, unknown[]>;

export interface Sql {
  Connection: SqlConnection;
  ProductStore: ProductStore;
  UserStore: UserStore;
}
