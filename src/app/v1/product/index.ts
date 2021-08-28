import { Product } from '@model/product';
import { app } from '@app/app';

export class ProductsRepository {
  public async getProducts(): Promise<Product[]> {
    const { ProductStore } = app.store.Sql();

    const products = await ProductStore.getAll();

    return products;
  }

  public async getProduct(id: string): Promise<Product | null> {
    const { ProductStore } = app.store.Sql();

    const product = await ProductStore.getOne(id);

    if (product) {
      return product;
    }

    return null;
  }

  public async setProduct(product: Product): Promise<Product> {
    const { ProductStore } = app.store.Sql();

    const newProduct = await ProductStore.insertOne(product);

    return newProduct;
  }

  public async setProducts(product: Product[]): Promise<Product[]> {
    const { ProductStore } = app.store.Sql();

    const newProducts = await ProductStore.insertMany(product);

    return newProducts;
  }
}
