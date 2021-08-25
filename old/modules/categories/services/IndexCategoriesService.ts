import { PrismaClient, categories } from '@prisma/client';

class IndexCategoriesService {
  private dbInstance = new PrismaClient();

  public async run(): Promise<categories[]> {
    const category = await this.dbInstance.categories.findMany({ include: { image: true } });

    return category;
  }
}

export default IndexCategoriesService;
