import { Router } from 'express';

const userRoute = Router();

/******************** INDEX ********************/
userRoute.get('/', async (request, response) => {
  // const indexProductsService = new IndexCatalogService();
  // const data = await indexProductsService.run();

  const data = [
    {
      id: 1,
      name: 'jose',
    },
    {
      id: 2,
      name: 'joao',
    },
  ];

  return response.json(data);
});

/******************** SHOW ********************/
userRoute.get('/:id', async (request, response) => {
  const { id } = request.params;
  // const showProductsService = new ShowCatalogService();
  // const data = await showProductsService.run(id);

  return response.json({
    id,
    name: 'jose',
  });
});

export default userRoute;
