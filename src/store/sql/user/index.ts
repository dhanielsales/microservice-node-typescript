import { SqlConnection } from '@model/sql';
import { User } from '@model/user';

export class UserStore {
  private readonly connection: SqlConnection;

  constructor(connection: SqlConnection) {
    this.connection = connection;
  }

  public async getAll(): Promise<User[]> {
    const users = await this.connection.select('*').from('users');

    return users;
  }

  public async getOne(id: string): Promise<User | null> {
    const user = await this.connection.select('*').from('users').where({ id }).limit(1);

    if (user) {
      return user[0];
    }

    return null;
  }

  public async insertOne(user: User): Promise<User> {
    const [id] = await this.connection.insert(user).into('users');
    const newUser = await this.connection.select('*').from('users').where({ id }).limit(1);

    return newUser[0];
  }

  public async insertMany(users: User[]): Promise<User[]> {
    const ids = await this.connection.insert(users).into('users');
    const newUsers = await this.connection.select('*').from('users').whereIn('id', ids);

    return newUsers;
  }

  public async removeOne(id: string): Promise<number | null> {
    const user = await this.connection.delete().from('users').where({ id });

    return user;
  }
}
