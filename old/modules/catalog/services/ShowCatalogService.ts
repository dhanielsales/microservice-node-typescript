import { PrismaClient, categories } from '@prisma/client';
import AppError from '@shared/errors/AppError';

class ShowCatalogService {
  private dbInstance = new PrismaClient();

  public async run(id: string): Promise<categories | null> {
    const catalog = await this.dbInstance.categories.findUnique({
      where: {
        id,
      },
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

    if (!catalog) {
      throw new AppError('Not found catalog', 404);
    }

    return catalog;
  }
}

export default ShowCatalogService;
