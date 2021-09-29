import { Product } from '@model/product';
import { Service } from '@service/index';
import AppError from '@shared/infra/agregators/AppError';

export class ProductsRepository {
  public async getProducts(): Promise<Product[]> {
    const { store } = Service.getInstance();
    const { product } = store.sql;
    const results = await product.getAll();

    return results;
  }

  public async getProduct(id: string): Promise<Product> {
    const { store } = Service.getInstance();
    const { product } = store.sql;
    const result = await product.getOne(id);

    if (!result) {
      throw new AppError('Not found.', 404);
    }

    return result;
  }
}
