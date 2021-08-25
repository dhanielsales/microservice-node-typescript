import { PrismaClient, saved_products } from '@prisma/client';

class IndexSavedProductsService {
  private dbInstance = new PrismaClient();

  public async run(): Promise<saved_products[]> {
    const savedProducts = await this.dbInstance.saved_products.findMany();

    return savedProducts;
  }
}

export default IndexSavedProductsService;
