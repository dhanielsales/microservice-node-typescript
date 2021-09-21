import { v4 } from 'uuid';

import AppError from '@shared/infra/agregators/AppError';

import { User } from '@model/user';
import { Service } from '@service/index';

export class UserRepository {
  private static instance: UserRepository;
  private constructor() { }

  static getInstance(): UserRepository {
    if (!UserRepository.instance) {
        UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }

  public async getUsers(): Promise<User[]> {
    const { store } = Service.getInstance()
    const { user } = store.sql
    const results = await user.getAll();

    return results;
  }

  public async getUser(id: string): Promise<User> {
    const { store } = Service.getInstance()
    const { user } = store.sql
    const result = await user.getOne(id);

    if (!result) {
      throw new AppError('Not found', 404);
    }

    return result;
  }

  public async addUser(newUser: User): Promise<User> {
    const id = v4();
    newUser.id = id;

    const { store } = Service.getInstance()
    const { user } = store.sql
    const result = await user.insertOne(newUser);

    return result;
  }

  public async updateUser(updateUser: User, id: string): Promise<User> {
    const { store } = Service.getInstance()
    const { user } = store.sql
    const result = await user.updateOne(updateUser, id);

    if (!result) {
      throw new AppError('Not found', 404);
    }

    return result
  }

  public async removeUser(id: string): Promise<void> {
    const { store } = Service.getInstance()
    const { user } = store.sql
    const result = await user.removeOne(id);

    if (!result) {
      throw new AppError('Not found', 404);
    }
  }
}
