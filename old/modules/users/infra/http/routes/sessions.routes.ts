import { Router } from 'express';

import CreateSessionService from '@modules/users/services/CreateSessionService';

const sessionsRouter = Router();

/******************** STORE ********************/
sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const createSessionService = new CreateSessionService();

  const { user, token } = await createSessionService.run({ email, password });

  return response.json({ user, token });
});

export default sessionsRouter;
