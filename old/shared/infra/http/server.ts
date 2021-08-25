import '@config/enviroment';

import express, { Router } from 'express';

import 'express-async-errors';

import routes from './routes';
import { exceptionsHandler } from './middlewares/exceptionsHandler';

const app = express();

// Express using JSON
app.use(express.json());

// All Routes
app.use(routes);

const routes2 = Router();

routes2.get('/aula1', (req, res) => {
  return {
    ola: 'yanka',
  };
});

app.use(routes2);

// Exceptions Handler | IMPORTANT --> Must be after routes <-- IMPORTANT |
app.use(exceptionsHandler);

app.listen(3333, () => {
  console.log('Server listening on port 3333.');
});
