import { PrismaClient, products } from '@prisma/client';

class IndexProductsService {
  private dbInstance = new PrismaClient();

  public async run(): Promise<products[]> {
    const products = await this.dbInstance.products.findMany({ include: { image: true } });

    return products;
  }
}

export default IndexProductsService;
