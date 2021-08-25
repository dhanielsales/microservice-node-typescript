import { Router } from 'express';

import IndexCatalogService from '@modules/catalog/services/IndexCatalogService';
import ShowCatalogService from '@modules/catalog/services/ShowCatalogService';

const productsRouter = Router();

/******************** INDEX ********************/
productsRouter.get('/', async (request, response) => {
  const indexProductsService = new IndexCatalogService();
  const data = await indexProductsService.run();

  return response.json(data);
});

/******************** SHOW ********************/
productsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const showProductsService = new ShowCatalogService();
  const data = await showProductsService.run(id);

  return response.json(data);
});

export default productsRouter;
