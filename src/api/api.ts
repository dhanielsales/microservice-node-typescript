import 'express-async-errors';
import express, { Router } from 'express';

import { exceptionsHandler } from '@api/middlewares/conventional/exceptionsHandler';
import AppLogger from '@shared/infra/agregators/AppLogger';

import { Service } from '@service/index';

import { V0 } from '@api/v0';
import { V1 } from '@api/v1';
import { Health } from '@api/health';

// import printRoutes from '@shared/utils/printRoutes';
export class Api {
  private static instance: Api;
  public readonly router: Router = Router();
  private readonly health: Health;
  private readonly v1: V1;
  private readonly v0: V0;

  private constructor() {
    // Instancia todas as versões da API
    this.v1 = V1.getInstance();
    this.v0 = V0.getInstance();
    this.health = Health.getInstance();
    // TODO: Verificar o env por quais versões de API devem subir

    // Instancia todas as rotas de acordo com as versões da API
    this.instanceRoutes();

    // Aplica todos os middlewares na API
    this.applyMiddlewares();
  }

  static getInstance(): Api {
    if (!Api.instance) {
      Api.instance = new Api()
    }
    return Api.instance;
  }
  
  private instanceRoutes() {
    this.router.use('/health', this.health.router);
    this.router.use('/v0', this.v0.router);
    this.router.use('/v1', this.v1.router);
  }

  private applyMiddlewares() {
    // Inicialização de principais middlewares
    // TODO: Aplicar Cors middleware
    this.router.use(exceptionsHandler);
  }

  async initServer(service: Service) {
    // Criando instancia do HTTP Server
    const server = express();

    // Aplicando instancia com JSON
    server.use(express.json());

    // Extrai instancia da Api do App
    const api = service.getApi();

    // Adiciona todas as rotas ao App
    server.use(api.router);

    server.listen(3333, () => {
      // Mostra todas as rotas da aplicação
      // printRoutes(server._router.stack);

      new AppLogger({
        date: new Date(),
        message: 'Server listening on port 3333.',
        type: 'INFO',
      });
    });
  }
}
