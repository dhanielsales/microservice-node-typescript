import { PrismaClient, saved_products } from '@prisma/client';
import AppError from '@shared/errors/AppError';

class ShowSavedProductsService {
  private dbInstance = new PrismaClient();

  public async run(id: string): Promise<saved_products | null> {
    const savedProducts = await this.dbInstance.saved_products.findUnique({
      where: {
        id,
      },
    });

    if (!savedProducts) {
      throw new AppError('Not found saved product', 404);
    }

    return savedProducts;
  }
}

export default ShowSavedProductsService;
