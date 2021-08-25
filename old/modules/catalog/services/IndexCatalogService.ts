import { PrismaClient, categories } from '@prisma/client';

class IndexCatalogService {
  private dbInstance = new PrismaClient();

  public async run(): Promise<categories[]> {
    const catalog = await this.dbInstance.categories.findMany({
      include: {
        image: true,
        product_categories: {
          include: {
            product: {
              include: { image: true },
            },
          },
        },
      },
    });

    return catalog;
  }
}

export default IndexCatalogService;
