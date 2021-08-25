import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import { PrismaClient, users } from '@prisma/client';

interface Request {
  id: string;
  email: string;
  name: string;
  phone: string;
  password: string;
}

class UpdateUserService {
  private dbInstance = new PrismaClient();

  public async run(data: Request): Promise<users> {
    const hashedPassword = await hash(data.password, 8);

    const user = await this.dbInstance.users.update({
      where: { id: data.id },
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return user;
  }
}

export default UpdateUserService;
