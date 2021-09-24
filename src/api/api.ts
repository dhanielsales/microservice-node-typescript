import 'express-async-errors'; // TODO Abstrair essa implementação para outra camada
import express from 'express';

import { exceptionsHandler } from '@api/middlewares/conventional/exceptionsHandler';
import AppLogger from '@shared/infra/agregators/AppLogger';
import { Service } from '@service/index';

import { ApiImpl } from '@model/api';

import { V0 } from '@api/v0';
import { V1 } from '@api/v1';
import { Health } from '@api/health';

// import printRoutes from '@shared/utils/printRoutes';
export class Api extends ApiImpl {
  private static instance: Api;
  private readonly health: Health;
  private readonly v1: V1;
  private readonly v0: V0;

  private constructor() {
    super();
    // Instancia todas as versões da API
    this.v1 = new V1();
    this.v0 = new V0();
    this.health = new Health();
    // TODO: Verificar o env por quais versões de API devem subir

    // Instancia todas as rotas de acordo com as versões da API
    this.applyGroups();

    // Aplica todos os middlewares na API
    this.applyMiddlewares();
  }

  static getInstance(): Api {
    if (!Api.instance) {
      Api.instance = new Api();
    }
    return Api.instance;
  }

  private applyGroups() {
    this.applyGroup('/health', this.health.getRouter());
    this.applyGroup('/v0', this.v0.getRouter());
    this.applyGroup('/v1', this.v1.getRouter());
  }

  private applyMiddlewares() {
    // Inicialização de principais middlewares
    // TODO: Aplicar Cors middleware
    this.applyMiddleware(exceptionsHandler);
  }

  async initServer(service: Service) {
    // Criando instancia do HTTP Server
    const server = express();

    // Aplicando instancia com JSON
    server.use(express.json());

    // Extrai instancia da Api do App
    const { api } = service;

    // Adiciona todas as rotas ao App
    server.use(api.getRouter());

    server.listen(3333, () => {
      // Mostra todas as rotas da aplicação
      // printRoutes(server._router.stack);

      new AppLogger({
        message: 'Server listening on port 3333.',
        type: 'INFO',
      });
    });
  }
}
