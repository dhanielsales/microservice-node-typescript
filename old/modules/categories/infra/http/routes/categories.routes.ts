import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import CreateCategoriesService from '@modules/categories/services/CreateCategoriesService';
import IndexCategoriesService from '@modules/categories/services/IndexCategoriesService';
import ShowCategoriesService from '@modules/categories/services/ShowCategoriesService';
import UpdateCategoriesService from '@modules/categories/services/UpdateCategoriesService';
import DeleteCategoriesService from '@modules/categories/services/DeleteCategoriesService';

const categoriesRouter = Router();

/******************** INDEX ********************/
categoriesRouter.get('/', async (request, response) => {
  const indexService = new IndexCategoriesService();
  const data = await indexService.run();

  return response.json(data);
});

/******************** SHOW ********************/
categoriesRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const showService = new ShowCategoriesService();
  const data = await showService.run(id);

  return response.json(data);
});

/******************** STORE ********************/
categoriesRouter.post('/', async (request, response) => {
  const { name, slug, description, is_active, image } = request.body;

  const createService = new CreateCategoriesService();
  const data = await createService.run({
    name,
    description,
    is_active,
    image,
  });

  return response.json(data);
});

/******************** UPDATE ********************/
categoriesRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, description, is_active, image } = request.body;

  const updateService = new UpdateCategoriesService();
  const data = await updateService.run({
    id,
    name,
    description,
    is_active,
    image,
  });

  return response.json(data);
});

/******************** DELETE ********************/
categoriesRouter.delete('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;

  const deleteService = new DeleteCategoriesService();
  const data = await deleteService.run(id);

  return response.json(data);
});

export default categoriesRouter;
