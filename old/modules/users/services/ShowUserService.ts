import { PrismaClient, users } from '@prisma/client';
import AppError from '@shared/errors/AppError';

class ShowUserService {
  private dbInstance = new PrismaClient();

  public async run(id: string): Promise<users | null> {
    const user = await this.dbInstance.users.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError('Not found user', 404);
    }

    return user;
  }
}

export default ShowUserService;
