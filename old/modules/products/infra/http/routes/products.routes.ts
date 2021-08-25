import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import CreateProductsService from '@modules/products/services/CreateProductsService';
import IndexProductsService from '@modules/products/services/IndexProductsService';
import ShowProductsService from '@modules/products/services/ShowProductsService';
import UpdateProductsService from '@modules/products/services/UpdateProductsService';
import DeleteProductsService from '@modules/products/services/DeleteProductsService';

const productsRouter = Router();

/******************** INDEX ********************/
productsRouter.get('/', async (request, response) => {
  const indexProductsService = new IndexProductsService();
  const data = await indexProductsService.run();

  return response.json(data);
});

/******************** SHOW ********************/
productsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const showProductsService = new ShowProductsService();
  const data = await showProductsService.run(id);

  return response.json(data);
});

/******************** STORE ********************/
productsRouter.post('/', async (request, response) => {
  const { name, price, description, is_active, image, category_ids } = request.body;

  const createUserService = new CreateProductsService();
  const data = await createUserService.run({
    name,
    category_ids,
    price,
    description,
    is_active,
    image,
  });

  return response.json(data);
});

/******************** UPDATE ********************/
productsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, price, description, is_active, image, category_ids } = request.body;

  const updateProductsService = new UpdateProductsService();
  const data = await updateProductsService.run({
    id,
    name,
    category_ids,
    price,
    description,
    is_active,
    image,
  });

  return response.json(data);
});

/******************** DELETE ********************/
productsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteProductsService = new DeleteProductsService();
  const data = await deleteProductsService.run(id);

  return response.json(data);
});

export default productsRouter;
