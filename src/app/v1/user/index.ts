import { User } from '@model/user';
import { app } from '@app/app';
import AppError from '@shared/errors/AppError';

export class UserRepository {
  public async getUsers(): Promise<User[]> {
    const { UserStore } = app.store.Sql();
    const users = await UserStore.getAll();

    return users;
  }

  public async getUser(id: string): Promise<User> {
    const { UserStore } = app.store.Sql();
    const user = await UserStore.getOne(id);

    if (!user) {
      throw new AppError('Not found', 404);
    }

    return user;
  }

  public async setUser(user: User): Promise<User> {
    const { UserStore } = app.store.Sql();

    const newUser = await UserStore.insertOne(user);

    return newUser;
  }

  public async setUsers(user: User[]): Promise<User[]> {
    const { UserStore } = app.store.Sql();

    const newUsers = await UserStore.insertMany(user);

    return newUsers;
  }
}
