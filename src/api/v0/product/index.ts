import { ProductsRepository } from '@app/v0/product';
import { ApiImpl, RequestMethod, Request, Response } from '@model/api';

export class ProductApi extends ApiImpl {
  constructor() {
    super();

    this.applyRoute(RequestMethod.GET, '/', this.index);
    this.applyRoute(RequestMethod.GET, '/:id', this.show);
  }

  async index(_: Request, response: Response) {
    const repository = ProductsRepository.getInstance();
    const data = await repository.getProducts();

    return response.json(data);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const repository = ProductsRepository.getInstance();
    const data = await repository.getProduct(id);

    return response.status(200).json(data);
  }
}
