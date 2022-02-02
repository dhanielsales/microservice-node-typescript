import { V0 } from '@app/v0';
import { V1 } from '@app/v1';

export class App {
  public readonly v0: V0;
  public readonly v1: V1;

  constructor() {
    // TODO: Verificar o env por quais versões de API devem subir
    // Cria instancia de todas as versões da APP
    this.v1 = new V1();
    this.v0 = new V0();
  }
}
