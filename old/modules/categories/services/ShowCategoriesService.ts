import { PrismaClient, categories } from '@prisma/client';
import AppError from '@shared/errors/AppError';

class ShowCategoriesService {
  private dbInstance = new PrismaClient();

  public async run(id: string): Promise<categories | null> {
    const category = await this.dbInstance.categories.findUnique({
      where: {
        id,
      },
      include: { image: true },
    });

    if (!category) {
      throw new AppError('Not found category', 404);
    }

    return category;
  }
}

export default ShowCategoriesService;
