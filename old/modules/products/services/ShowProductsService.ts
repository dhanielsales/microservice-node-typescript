import { PrismaClient, products } from '@prisma/client';
import AppError from '@shared/errors/AppError';

class ShowProductsService {
  private dbInstance = new PrismaClient();

  public async run(id: string): Promise<products | null> {
    const user = await this.dbInstance.products.findUnique({
      where: {
        id,
      },
      include: { image: true },
    });

    if (!user) {
      throw new AppError('Not found product', 404);
    }

    return user;
  }
}

export default ShowProductsService;
