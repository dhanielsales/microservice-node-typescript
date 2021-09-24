import { SqlConnection } from '@model/sql';
import { User } from '@model/user';
import { getSqlConnector } from '@shared/infra/database/sqlConnection';

export class UserStore {
  private static instance: UserStore;
  private readonly connection: SqlConnection = getSqlConnector();

  private constructor() {}

  static getInstance(): UserStore {
    if (!UserStore.instance) {
      UserStore.instance = new UserStore();
    }
    return UserStore.instance;
  }

  public async getAll(): Promise<User[]> {
    const users = await this.connection.select('*').from('users');

    return users;
  }

  public async getOne(id: string): Promise<User | null> {
    const user = await this.connection.select('*').from('users').where({ id }).limit(1);

    return user ? user[0] : null;
  }

  public async insertOne(user: User): Promise<User> {
    await this.connection.insert(user).into('users');
    const newUser = await this.connection.select('*').from('users').where({ id: user.id }).limit(1);

    return newUser[0];
  }

  public async updateOne(user: User, id: string): Promise<User | null> {
    await this.connection('users').update(user).where({ id });
    const updatedUser = await this.connection.select('*').from('users').where({ id }).limit(1);
    return updatedUser[0];
  }

  public async removeOne(id: string): Promise<number | null> {
    // TODO Implementar deleted_at ao inves de remoção, após construção de estrutura de migrations
    const user = await this.connection.delete().from('users').where({ id });
    return user;
  }
}
