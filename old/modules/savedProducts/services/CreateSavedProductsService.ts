import { PrismaClient, saved_products } from '@prisma/client';

interface Request {
  user_id: string;
  product_id: string;
}

class CreateSavedProductsService {
  private dbInstance = new PrismaClient();

  public async run(data: Request): Promise<saved_products> {
    const saved_product = await this.dbInstance.saved_products.create({ data });

    return saved_product;
  }
}

export default CreateSavedProductsService;
