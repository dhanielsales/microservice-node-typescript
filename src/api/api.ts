import core, { Express } from 'express';

import { exceptionsHandler } from '@shared/presentation/middlewares/conventional/exceptionsHandler';

import AppLogger from '@shared/infra/agregators/AppLogger';

import { V0 } from '@api/v0';
import { V1 } from '@api/v1';
import { Health } from '@api/health';

// import printRoutes from '@shared/utils/printRoutes';
export class Api {
  public readonly router: Express;
  private readonly health: Health;
  private readonly v1: V1;
  private readonly v0: V0;

  constructor() {
    this.router = core();

    // Instancia todas as versões da API
    this.v1 = new V1();
    this.v0 = new V0();
    this.health = new Health();
    // TODO: Verificar o env por quais versões de API devem subir

    // Instancia todas as rotas de acordo com as versões da API
    this.instanceRoutes();

    // Aplica todos os middlewares na API
    this.applyMiddlewares();
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

  async startServer() {
    this.router.use(core.json());

    this.router.listen(3333, () => {
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
