import { app } from '@app/app';
import { User } from '@model/user';

const USERS_ALL_KEY = 'ALL_USERS';
const USER_KEY = 'USER';
const USERS_EXPIRATION_TIME = 60 * 5; // 5 minutes

export async function getUserInCache(id: string): Promise<User> {
  const cacheInstance = app.cache.getInstance();

  const key = id + '_' + USER_KEY;

  return (await cacheInstance.get(key)) as User;
}

export async function setUserInCache(user: User): Promise<boolean> {
  const cacheInstance = app.cache.getInstance();

  const key = user.id + '_' + USER_KEY;

  return (await cacheInstance.set(key, user)) === 'Ok';
}
