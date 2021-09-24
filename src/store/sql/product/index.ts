import { Product } from '@model/product';
import { SqlConnection } from '@model/sql';
import { getSqlConnector } from '@shared/infra/database/sqlConnection';

export class ProductStore {
  private static instance: ProductStore;
  private readonly connection: SqlConnection = getSqlConnector();

  private constructor() {}

  static getInstance(): ProductStore {
    if (!ProductStore.instance) {
      ProductStore.instance = new ProductStore();
    }
    return ProductStore.instance;
  }

  public async getAll(): Promise<Product[]> {
    const products = await this.connection.select('*').from('products');

    return products;
  }

  public async getOne(id: string): Promise<Product | null> {
    const product = await this.connection.select('*').from('products').where({ id }).limit(1);

    if (product) {
      return product[0];
    }

    return null;
  }

  public async insertOne(product: Product): Promise<Product> {
    await this.connection.insert(product).into('products');
    const newProduct = await this.connection
      .select('*')
      .from('products')
      .where({ id: product.id })
      .limit(1);

    return newProduct[0];
  }

  public async insertMany(products: Product[]): Promise<Product[]> {
    const ids = await this.connection.insert(products).into('products');
    const newProducts = await this.connection.select('*').from('products').whereIn('id', ids);

    return newProducts;
  }
}
