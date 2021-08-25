import { PrismaClient, categories } from '@prisma/client';
import getSlugified from '@shared/infra/agregators/slugify';
import UploadS3Files from '@shared/infra/external/aws/s3';
import { uuid } from 'uuidv4';

interface Request {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  image: {
    content: string;
    name: string;
    type: string;
    subtype: string;
  };
}

class UpdateCategoriesService {
  private dbInstance = new PrismaClient();

  public async run(data: Request): Promise<categories> {
    const dataToUpdate: any = {
      ...data,
    };

    if (data.name) {
      const slug = await getSlugified({ tableReference: 'products', valueToSlug: data.name });
      dataToUpdate.slug = slug;
    }

    if (data.image) {
      const fimeName = `product-${Math.round(Math.random() * 100)}${uuid()}.${data.image.subtype}`;

      const uploadS3Files = new UploadS3Files();

      const { url } = await uploadS3Files.run({ base64File: data.image.content, key: fimeName });

      dataToUpdate.image = {
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

    const category = await this.dbInstance.categories.update({
      where: { id: data.id },
      data: dataToUpdate,
    });

    return category;
  }
}

export default UpdateCategoriesService;
