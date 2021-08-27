import { PreferenceRepository } from '@app/v1/preference';
import { Router } from 'express';

const preferenceRoute = Router();

/******************** INDEX ********************/
preferenceRoute.get('/', async (request, response) => {
  const repository = new PreferenceRepository();
  const data = await repository.getPreferences();

  return response.json(data);
});

/******************** SHOW ********************/
preferenceRoute.get('/:id', async (request, response) => {
  const { id } = request.params;
  const repository = new PreferenceRepository();
  const data = await repository.getPreference(id);

  // TODO: transferir validação para dentro do repository ?

  return response.status(data ? 200 : 404).json(data);
});

export default preferenceRoute;
