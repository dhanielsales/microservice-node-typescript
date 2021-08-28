import 'express-async-errors';

import express from 'express';

import { App } from '@app/app';

import printRoutes from '@shared/utils/printRoutes';
import AppLogger from '@shared/infra/agregators/AppLogger';

export async function initServer(app: App) {
  // Criando instancia da Aplicação
  const server = express();

  // Aplicando instancia com JSON
  server.use(express.json());

  // Extrai instancia da Api do App
  const { api } = app;

  // Adiciona todas as rotas ao App
  server.use(api.init());

  server.listen(3333, () => {
    // Printa todas as rotas da aplicação
    // printRoutes(server._router.stack);

    new AppLogger({
      date: new Date(),
      message: 'Server listening on port 3333.',
      type: 'INFO',
    });
  });
}
