import { NoSqlConnection } from '@model/noSql';
import { PreferenceStore } from '@store/nosql/preference';

export class NoSql {
  public readonly connection: NoSqlConnection;
  public readonly preference: PreferenceStore;

  constructor(connection: NoSqlConnection) {
    this.connection = connection;
    this.preference = PreferenceStore.getInstance();
  }
}
