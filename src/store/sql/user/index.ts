import { SqlConnection } from '@model/sql';
import { User } from '@model/user';

const usersMock: User[] = [
  {
    id: '1',
    name: 'jose',
  },
  {
    id: '2',
    name: 'joao',
  },
];

export class UserStore {
  private readonly connection: SqlConnection;

  constructor(connection: SqlConnection) {
    this.connection = connection;
  }

  public async getUsers(): Promise<User[]> {
    const users = usersMock;

    return users;
  }

  public async getUser(id: string): Promise<User | null> {
    const user = usersMock.filter(user => user.id === id)[0];

    if (user) {
      return user;
    }

    return null;
  }
}
