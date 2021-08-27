import { ProductsRepository } from '@app/v0/product';
import { Router } from 'express';

const productRoute = Router();

/******************** INDEX ********************/
productRoute.get('/', async (request, response) => {
  const repository = new ProductsRepository();
  const data = await repository.getProducts();

  return response.json(data);
});

/******************** SHOW ********************/
productRoute.get('/:id', async (request, response) => {
  const { id } = request.params;
  const repository = new ProductsRepository();
  const data = await repository.getProduct(id);

  // TODO: transferir validação para dentro do repository ?

  return response.status(data ? 200 : 404).json(data);
});

export default productRoute;
