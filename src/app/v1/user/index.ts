import { uuid } from 'uuidv4';

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
    const store = Service.getInstance().getStore()
    const { UserStore } = store.Sql()
    const users = await UserStore.getAll();

    return users;
  }

  public async getUser(id: string): Promise<User> {
    const store = Service.getInstance().getStore()
    const { UserStore } = store.Sql()
    const user = await UserStore.getOne(id);

    if (!user) {
      throw new AppError('Not found', 404);
    }

    return user;
  }

  public async addUser(user: User): Promise<User> {
    const id = uuid();
    user.id = id;

    const store = Service.getInstance().getStore()
    const { UserStore } = store.Sql()
    const newUser = await UserStore.insertOne(user);

    return newUser;
  }

  public async updateUser(user: User, id: string): Promise<void> {
    const store = Service.getInstance().getStore()
    const { UserStore } = store.Sql()
    const updatedUser = await UserStore.updateOne(user, id);

    if (!updatedUser) {
      throw new AppError('Not found', 404);
    }
  }

  public async removeUser(id: string): Promise<void> {
    const store = Service.getInstance().getStore()
    const { UserStore } = store.Sql()
    const user = await UserStore.removeOne(id);

    if (!user) {
      throw new AppError('Not found', 404);
    }
  }
}
