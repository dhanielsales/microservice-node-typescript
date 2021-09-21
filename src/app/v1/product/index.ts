import AppError from '@shared/infra/agregators/AppError';
import { Product } from '@model/product';

import { Service } from '@service/index';

export class ProductsRepository {
  private static instance: ProductsRepository;
  private constructor() { }

  static getInstance(): ProductsRepository {
    if (!ProductsRepository.instance) {
        ProductsRepository.instance = new ProductsRepository();
    }
    return ProductsRepository.instance;
  }

  public async getProducts(): Promise<Product[]> {
    const { store } = Service.getInstance();
    const { ProductStore } = store.sql

    const products = await ProductStore.getAll();

    return products;
  }

  public async getProduct(id: string): Promise<Product | null> {
    const { store } = Service.getInstance();
    const { ProductStore } = store.sql

    const product = await ProductStore.getOne(id);

    if (!product) {
      throw new AppError('Not found.', 404);
    }

    return product;
  }

  public async setProduct(product: Product): Promise<Product> {
    const { store } = Service.getInstance();
    const { ProductStore } = store.sql

    const newProduct = await ProductStore.insertOne(product);

    return newProduct;
  }

  public async setProducts(product: Product[]): Promise<Product[]> {
    const { store } = Service.getInstance();
    const { ProductStore } = store.sql

    const newProducts = await ProductStore.insertMany(product);

    return newProducts;
  }
}
