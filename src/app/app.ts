import { V0 } from '@app/v0';
import { V1 } from '@app/v1';

// import printRoutes from '@shared/utils/printRoutes';
export class App {
  private static instance: App;
  public readonly v0: V0;
  public readonly v1: V1;

  private constructor() {
    // TODO: Verificar o env por quais versões de API devem subir
    // Cria instancia de todas as versões da APP
    this.v1 = V1.getInstance();
    this.v0 = V0.getInstance();
  }

  static getInstance(): App {
    if (!App.instance) {
      App.instance = new App()
    }
    return App.instance;
  }
}
