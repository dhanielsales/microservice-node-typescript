import { PrismaClient, saved_products } from '@prisma/client';

class DeleteSavedProductsService {
  private dbInstance = new PrismaClient();

  public async run(id: string): Promise<saved_products | null> {
    const deletedSavedProducts = this.dbInstance.saved_products.delete({ where: { id } });

    return deletedSavedProducts;
  }
}

export default DeleteSavedProductsService;
