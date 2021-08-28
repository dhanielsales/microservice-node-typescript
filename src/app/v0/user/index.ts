import { User } from '@model/user';
import { app } from '@app/app';

export class UserRepository {
  public async getUsers(): Promise<User[]> {
    const { UserStore } = app.store.Sql();
    const users = await UserStore.getAll();

    return users;
  }

  public async getUser(id: string): Promise<User | null> {
    const { UserStore } = app.store.Sql();
    const user = await UserStore.getOne(id);

    if (user) {
      return user;
    }

    return null;
  }
}
