import { Router } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import IndexUserService from '@modules/users/services/IndexUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();
usersRouter.use(ensureAuthenticated);

/******************** INDEX ********************/
usersRouter.get('/', async (request, response) => {
  const indexUserService = new IndexUserService();
  const users = await indexUserService.run();

  return response.json(users);
});

/******************** SHOW ********************/
usersRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const showUserService = new ShowUserService();
  const user = await showUserService.run(id);

  return response.json(user);
});

/******************** STORE ********************/
usersRouter.post('/', async (request, response) => {
  const { email, name, password, phone } = request.body;

  const createUserService = new CreateUserService();
  const user = await createUserService.run({ email, name, password, phone });

  return response.json(user);
});

/******************** UPDATE ********************/
usersRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { email, name, password, phone } = request.body;

  const updateUserService = new UpdateUserService();
  const user = await updateUserService.run({ id, email, name, password, phone });

  return response.json(user);
});

export default usersRouter;
