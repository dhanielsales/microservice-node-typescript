import { Router } from 'express';

const productRoute = Router();

/******************** INDEX ********************/
productRoute.get('/', async (request, response) => {
  // const indexProductsService = new IndexCatalogService();
  // const data = await indexProductsService.run();

  const data = [
    {
      id: 1,
      name: 'pão',
    },
    {
      id: 2,
      name: 'leite',
    },
  ];

  return response.json(data);
});

/******************** SHOW ********************/
productRoute.get('/:id', async (request, response) => {
  const { id } = request.params;
  // const showProductsService = new ShowCatalogService();
  // const data = await showProductsService.run(id);

  return response.json({
    id,
    name: 'leite',
  });
});

export default productRoute;
