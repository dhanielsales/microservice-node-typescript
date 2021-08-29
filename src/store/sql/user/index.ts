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

    return user ? user[0] : null;
  }

  public async insertOne(user: User): Promise<User> {
    await this.connection.insert(user).into('users');
    const newUser = await this.connection.select('*').from('users').where({ id: user.id }).limit(1);

    return newUser[0];
  }

  public async updateOne(user: User, id: string): Promise<number | null> {
    const updatedUser = await this.connection('users').update(user).where({ id });

    return updatedUser || null;
  }

  public async removeOne(id: string): Promise<number | null> {
    const user = await this.connection.delete().from('users').where({ id });

    return user;
  }
}
