import { User } from '@model/user';
import { Service } from '@service/index';
import AppError from '@shared/infra/agregators/AppError';

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
    const { store } = Service.getInstance()
    const { user } = store.sql
    const result = await user.getAll();

    return result;
  }

  public async getUser(id: string): Promise<User | null> {
    const { store } = Service.getInstance()
    const { user } = store.sql
    const result = await user.getOne(id);

    if (!result) {
      throw new AppError('Not found.', 404);
    }

    return result;
  }
}
