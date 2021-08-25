import { Product } from '@model/product';

const productsMock: Product[] = [
  {
    id: '1',
    name: 'pão',
  },
  {
    id: '2',
    name: 'leite',
  },
];

export class ProductsRepository {
  public async getProducts(): Promise<Product[]> {
    const products = productsMock;

    return products;
  }

  public async getProduct(id: string): Promise<Product | null> {
    const product = productsMock.filter(product => product.id === id)[0];

    if (product) {
      return product;
    }

    return null;
  }
}
