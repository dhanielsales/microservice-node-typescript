import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import CreateSavedProductsService from '@modules/savedProducts/services/CreateSavedProductsService';
import IndexSavedProductsService from '@modules/savedProducts/services/IndexSavedProductsService';
import ShowSavedProductsService from '@modules/savedProducts/services/ShowSavedProductsService';
import DeleteSavedProductsService from '@modules/savedProducts/services/DeleteSavedProductsService';

const savedProductsRouter = Router();
savedProductsRouter.use(ensureAuthenticated);

/******************** INDEX ********************/
savedProductsRouter.get('/', async (request, response) => {
  const indexProductsService = new IndexSavedProductsService();
  const data = await indexProductsService.run();

  return response.json(data);
});

/******************** SHOW ********************/
savedProductsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const showProductsService = new ShowSavedProductsService();
  const data = await showProductsService.run(id);

  return response.json(data);
});

/******************** STORE ********************/
savedProductsRouter.post('/', async (request, response) => {
  const { product_id, user_id } = request.body;

  const createUserService = new CreateSavedProductsService();
  const data = await createUserService.run({
    product_id,
    user_id,
  });

  return response.json(data);
});

/******************** DELETE ********************/
savedProductsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteProductsService = new DeleteSavedProductsService();
  await deleteProductsService.run(id);

  return response.status(204).json();
});

export default savedProductsRouter;
