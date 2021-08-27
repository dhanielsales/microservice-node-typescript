import 'express-async-errors';

import express from 'express';

import { Api } from '@api/api';

import printRoutes from '@shared/utils/printRoutes';

export async function initServer() {
  // Criando instancia da Aplicação
  const server = express();

  // Aplicando instancia com JSON
  server.use(express.json());

  // Cria instancia da API
  const apiInstance = new Api();
  const api = apiInstance.init();

  // Adiciona todas as rotas ao App
  server.use(api);

  server.listen(3333, () => {
    printRoutes(server._router.stack);

    console.log('Server listening on port 3333.');
  });
}
