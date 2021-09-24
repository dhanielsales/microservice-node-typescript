import { ProductsRepository } from '@app/v1/product';
import { validateProductCreate } from '@model/product';
import { ApiImpl, RequestMethod, Request, Response } from '@model/api';

export class ProductApi extends ApiImpl {
  constructor() {
    super()

    this.applyRoute(RequestMethod.GET, '/', this.index);
    this.applyRoute(RequestMethod.GET, '/:id', this.show);
    this.applyRoute(RequestMethod.POST, '/', this.create)
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

  async create(request: Request, response: Response): Promise<any> {
    const payload = request.body;
    const product = await validateProductCreate(payload);

    const repository = ProductsRepository.getInstance();
    const data = await repository.addProduct(product);

    return response.status(200).json(data);
  }  
}
