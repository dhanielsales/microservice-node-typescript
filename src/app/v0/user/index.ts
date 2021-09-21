import { User } from '@model/user';
import { Service } from '@service/index';

export class UserRepository {
  private static instance: UserRepository;

  private constructor() {}

  static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository()
    }
    return UserRepository.instance
  }

  public async getUsers(): Promise<User[]> {
    const store = Service.getInstance().getStore()
    const { UserStore } = store.Sql();
    const users = await UserStore.getAll();

    return users;
  }

  public async getUser(id: string): Promise<User | null> {
    const store = Service.getInstance().getStore()
    const { UserStore } = store.Sql();
    const user = await UserStore.getOne(id);

    if (user) {
      return user;
    }

    return null;
  }
}
