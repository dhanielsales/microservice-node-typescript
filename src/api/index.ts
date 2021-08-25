import { Router } from 'express';
import { exceptionsHandler } from './middlewares/exceptionsHandler';

import { v0 } from './v0';
import { v1 } from './v1';
import { health } from './health';

export interface Versions {
  [key: string]: Router;
}

export class Api {
  private versions: Versions;
  private api: Router;

  constructor() {
    // Cria o router principal
    this.api = Router();

    // Instancia todas as versões da API
    this.instanceVersions();

    // Instancia todas as rotas de acordo com as versões da API
    this.instanceRoutes();

    // Aplica todos os middlewares na API
    this.applyMiddlewares();
  }

  public init(): Router {
    return this.api;
  }

  private instanceVersions() {
    // TODO: Verificar o env por quais versões de API devem subir
    this.versions = {
      health,
      v0,
      v1,
    };
  }

  private instanceRoutes() {
    for (var [key, value] of Object.entries(this.versions)) {
      this.api.use(`/${key}`, value);
    }
  }

  private applyMiddlewares() {
    // Middleware principal de Exceptions
    this.api.use(exceptionsHandler);
  }
}
