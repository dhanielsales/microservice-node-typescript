import { PrismaClient, products } from '@prisma/client';
import AppError from '@shared/errors/AppError';

class DeleteProductsService {
  private dbInstance = new PrismaClient();

  public async run(id: string): Promise<products> {
    const product = this.dbInstance.products.update({
      where: { id },
      data: { deleted_at: new Date() },
    });

    if (!product) {
      throw new AppError('Not found product', 404);
    }

    return product;
  }
}

export default DeleteProductsService;
