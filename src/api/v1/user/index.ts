import { UserRepository } from '@app/v1/user';
import { Router } from 'express';

const userRoute = Router();

/******************** INDEX ********************/
userRoute.get('/', async (request, response) => {
  const repository = new UserRepository();
  const data = await repository.getUsers();

  return response.json(data);
});

/******************** SHOW ********************/
userRoute.get('/:id', async (request, response) => {
  const { id } = request.params;
  const repository = new UserRepository();
  const data = await repository.getUser(id);

  // TODO: transferir validação para dentro do repository ?

  return response.status(data ? 200 : 404).json(data);
});

export default userRoute;
