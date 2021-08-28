import { ProductsRepository } from '@app/v1/product';

import { Router, Request, Response } from 'express';

export class ProductApi {
  router: Router = Router();

  constructor() {
    this.router.get('/', this.index);
    this.router.get('/:id', this.show);
  }

  async index(_: Request, response: Response): Promise<any> {
    const repository = new ProductsRepository();
    const data = await repository.getProducts();

    return response.json(data);
  }

  async show(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    const repository = new ProductsRepository();
    const data = await repository.getProduct(id);

    // TODO: transferir validação para dentro do repository ?

    return response.status(data ? 200 : 404).json(data);
  }
}
