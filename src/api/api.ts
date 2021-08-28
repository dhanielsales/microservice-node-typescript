import { Router } from 'express';
import { exceptionsHandler } from './middlewares/exceptionsHandler';

import { V0 } from '@api/v0';
import { V1 } from '@api/v1';
import { health } from '@api/health';

export class Api {
  private router: Router = Router();
  private health: Router;
  private v1: V1;
  private v0: V0 = new V0();

  constructor() {
    // Instancia todas as versões da API
    this.instanceVersions();

    // Instancia todas as rotas de acordo com as versões da API
    this.instanceRoutes();

    // Aplica todos os middlewares na API
    this.applyMiddlewares();
  }

  public init(): Router {
    return this.router;
  }

  private instanceVersions() {
    // Cria instancia de todas as versões da API
    this.v1 = new V1();
    // this.v0 = new V0();
    this.health = health;

    // TODO: Verificar o env por quais versões de API devem subir
  }

  private instanceRoutes() {
    this.router.use('/health', this.health);
    this.router.use('/v0', this.v0.router);
    this.router.use('/v1', this.v1.router);
  }

  private applyMiddlewares() {
    // Middleware principal de Exceptions
    // TODO: Aplicar Cors middleware
    this.router.use(exceptionsHandler);
  }
}
