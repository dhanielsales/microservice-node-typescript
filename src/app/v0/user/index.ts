import { User } from '@model/user';
import { Service } from '@service/index';
import AppError from '@shared/infra/agregators/AppError';

export class UserRepository {
  public async getUsers(): Promise<User[]> {
    const { store } = Service.getInstance();
    const { user } = store.sql;
    const result = await user.getAll();

    return result;
  }

  public async getUser(id: string): Promise<User | null> {
    const { store } = Service.getInstance();
    const { user } = store.sql;
    const result = await user.getOne(id);

    if (!result) {
      throw new AppError('Not found.', 404);
    }

    return result;
  }
}
