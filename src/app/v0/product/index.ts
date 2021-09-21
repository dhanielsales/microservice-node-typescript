import { Product } from '@model/product';
import { Service } from '@service/index';

export class ProductsRepository {
  private static instance: ProductsRepository;

  private constructor() {}

  static getInstance(): ProductsRepository {
    if (!ProductsRepository.instance) {
      ProductsRepository.instance = new ProductsRepository()
    }
    return ProductsRepository.instance
  } 
  
  public async getProducts(): Promise<Product[]> {
    const store = Service.getInstance().getStore()
    const { ProductStore } = store.Sql();

    const products = await ProductStore.getAll();

    return products;
  }

  public async getProduct(id: string): Promise<Product | null> {
    const store = Service.getInstance().getStore()
    const { ProductStore } = store.Sql();

    const product = await ProductStore.getOne(id);

    if (product) {
      return product;
    }

    return null;
  }
}
