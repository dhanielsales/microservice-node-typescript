import { PrismaClient, products } from '@prisma/client';
import setSlugified from '@shared/infra/agregators/slugify';
import UploadS3Files from '@shared/infra/external/aws/s3';
import { uuid } from 'uuidv4';

interface Request {
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

class CreateProductsService {
  private dbInstance = new PrismaClient();

  public async run(data: Request): Promise<products> {
    const dataToCreate: any = {
      name: data.name,
      price: data.price,
      description: data.description,
      is_active: data.is_active,
    };

    if (data.image) {
      const fimeName = `product-${Math.round(Math.random() * 100)}${uuid()}.${data.image.subtype}`;

      const uploadS3Files = new UploadS3Files();

      const { url } = await uploadS3Files.run({ base64File: data.image.content, key: fimeName });

      dataToCreate.image = {
        update: {
          key: fimeName,
          name: fimeName,
          url,
          original_name: data.image.name,
          type: data.image.type,
          subtype: data.image.subtype,
        },
      };
    }

    const product = await this.dbInstance.products.create({
      data: dataToCreate,
    });

    if (data.name) {
      await setSlugified({ tableReference: 'products', slug: data.name });
    }

    const dataToReacreateCategories = data.category_ids.map(id => ({
      category_id: id,
      product_id: product.id,
    }));

    if (dataToReacreateCategories.length > 0) {
      await this.dbInstance.product_categories.createMany({
        data: dataToReacreateCategories,
      });
    }

    return product;
  }
}

export default CreateProductsService;
