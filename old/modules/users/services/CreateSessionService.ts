import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { PrismaClient, users } from '@prisma/client';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
interface IRequest {
  email: string;
  password: string;
}

interface IRespose {
  user: users;
  token: string;
}

class CreateSessionService {
  private dbInstance = new PrismaClient();

  public async run({ email, password }: IRequest): Promise<IRespose> {
    const user = await this.dbInstance.users.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError('Incorrect email or password', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Incorrect email or password', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionService;
