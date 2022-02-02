import AppError from '@shared/infra/agregators/AppError';
import * as yup from 'yup';

export interface User {
  id: string;
  name: string;
}

const UserCreateSchema = yup.object({
  name: yup.string().required(),
});

const UserUpdateSchema = yup.object({
  name: yup.string().required(),
});

/**
 * Will throw a AppError when validation failures.
 */
export async function validateUserCreate(payload: User): Promise<User> {
  try {
    const user = sanitizeUser(payload);
    await UserCreateSchema.validate(user, { abortEarly: false });

    return user;
  } catch (err) {
    throw new AppError('Invalid request body.', 400, err.errors);
  }
}

/**
 * Will throw a AppError when validation failures.
 */
export async function validateUserUpdate(payload: User): Promise<User> {
  try {
    const user = sanitizeUser(payload);
    await UserUpdateSchema.validate(user, { abortEarly: false });

    return user;
  } catch (err) {
    throw new AppError('Invalid request body.', 400, err.errors);
  }
}

/**
 * Will sanitize the User object.
 */
export function sanitizeUser(payload: any): User {
  const user: Partial<User> = {
    name: payload?.name,
  };

  return user as User;
}
