import { Product } from '@model/product';
import { SqlConnection } from '@model/sql';

export class ProductStore {
  private readonly connection: SqlConnection;

  constructor(connection: SqlConnection) {
    this.connection = connection;
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
    const [id] = await this.connection.insert(product).into('product');
    const newProduct = await this.connection.select('*').from('product').where({ id }).limit(1);

    return newProduct[0];
  }

  public async insertMany(products: Product[]): Promise<Product[]> {
    const ids = await this.connection.insert(products).into('products');
    const newProducts = await this.connection.select('*').from('products').whereIn('id', ids);

    return newProducts;
  }
}
