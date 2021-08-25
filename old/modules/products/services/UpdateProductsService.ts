import { PrismaClient, products } from '@prisma/client';
import getSlugified from '@shared/infra/agregators/slugify';

interface Request {
  id: string;
  name: string;
  price: number;
  description: string;
  is_active: boolean;
  category_ids: string[];
  image: {
    content: string;
    name: string;
    type: string;
    subtype: string;
  };
}

class UpdateProductsService {
  private dbInstance = new PrismaClient();

  public async run(data: Request): Promise<products> {
    const dataToUpdate: any = {
      id: data.id,
      name: data.name,
      price: data.price,
      description: data.description,
      is_active: data.is_active,
    };

    if (data.name) {
      const slug = await getSlugified({ tableReference: 'products', valueToSlug: data.name });
      dataToUpdate.slug = slug;
    }

    const product = await this.dbInstance.products.update({
      where: { id: data.id },
      data: dataToUpdate,
    });

    await this.dbInstance.product_categories.deleteMany({
      where: {
        product_id: data.id,
      },
    });

    await this.dbInstance.product_categories.createMany({
      data: data.category_ids.map(id => ({
        category_id: id,
        product_id: product.id,
      })),
    });

    return product;
  }
}

export default UpdateProductsService;
