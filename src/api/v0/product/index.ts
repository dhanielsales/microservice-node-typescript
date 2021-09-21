import { ProductsRepository } from '@app/v0/product';
import { Router, Request, Response } from 'express';

export class ProductApi {
  private static instance: ProductApi;
  public readonly router: Router = Router();

  private constructor() {
    this.router.get('/', this.index);
    this.router.get('/:id', this.show);
  }

  static getInstance(): ProductApi {
    if (!ProductApi.instance) {
      ProductApi.instance = new ProductApi();
    }
    return ProductApi.instance
  }

  async index(_: Request, response: Response): Promise<any> {
    const repository = ProductsRepository.getInstance();
    const data = await repository.getProducts();

    return response.json(data);
  }

  async show(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    const repository = ProductsRepository.getInstance();
    const data = await repository.getProduct(id);

    return response.status(200).json(data);
  }
}
