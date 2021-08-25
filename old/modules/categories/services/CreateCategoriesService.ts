import { PrismaClient, categories } from '@prisma/client';
import getSlugified from '@shared/infra/agregators/slugify';
import UploadS3Files from '@shared/infra/external/aws/s3';
import { uuidv4 } from 'uuidv4';

interface Request {
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

class CreateCategoriesService {
  private dbInstance = new PrismaClient();

  public async run(data: Request): Promise<categories> {
    const slug = await getSlugified({ tableReference: 'categories', valueToSlug: data.name });

    const dataToCreate: any = {
      ...data,
      slug,
    };

    if (data.image) {
      const fimeName = `product-${Math.round(Math.random() * 100)}${uuidv4()}.${
        data.image.subtype
      }`;

      const uploadS3Files = new UploadS3Files();

      const { url } = await uploadS3Files.run({ base64File: data.image.content, key: fimeName });

      dataToCreate.image = {
        create: {
          key: fimeName,
          name: fimeName,
          url,
          original_name: data.image.name,
          type: data.image.type,
          subtype: data.image.subtype,
        },
      };
    }

    const category = await this.dbInstance.categories.create({ data: dataToCreate });

    return category;
  }
}

export default CreateCategoriesService;
