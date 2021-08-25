import { PrismaClient, categories } from '@prisma/client';
import AppError from '@shared/errors/AppError';

class DeleteCategoriesService {
  private dbInstance = new PrismaClient();

  public async run(id: string): Promise<categories> {
    const category = this.dbInstance.categories.update({
      where: { id },
      data: { deleted_at: new Date() },
    });

    if (!category) {
      throw new AppError('Not found category', 404);
    }

    return category;
  }
}

export default DeleteCategoriesService;
