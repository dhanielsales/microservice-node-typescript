import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import { PrismaClient, users } from '@prisma/client';

interface Request {
  email: string;
  name: string;
  phone: string;
  password: string;
}

class CreateUserService {
  private dbInstance = new PrismaClient();

  public async run(data: Request): Promise<users> {
    const findUserInTheSameEmail = await this.dbInstance.users.findUnique({
      where: { email: data.email },
    });

    if (findUserInTheSameEmail) {
      throw new AppError('Email already used', 401);
    }

    const hashedPassword = await hash(data.password, 8);

    const user = await this.dbInstance.users.create({
      data: { ...data, password: hashedPassword },
    });

    return user;
  }
}

export default CreateUserService;
