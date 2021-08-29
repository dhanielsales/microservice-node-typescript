import { uuid } from 'uuidv4';

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

  public async addUser(user: User): Promise<User> {
    const id = uuid();
    user.id = id;

    const { UserStore } = app.store.Sql();
    const newUser = await UserStore.insertOne(user);

    return newUser;
  }

  public async updateUser(user: User, id: string): Promise<void> {
    const { UserStore } = app.store.Sql();
    const updatedUser = await UserStore.updateOne(user, id);

    if (!updatedUser) {
      throw new AppError('Not found', 404);
    }
  }

  public async removeUser(id: string): Promise<void> {
    const { UserStore } = app.store.Sql();
    const user = await UserStore.removeOne(id);

    if (!user) {
      throw new AppError('Not found', 404);
    }
  }
}
