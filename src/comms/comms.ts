// TODO: Inregrar com todos os métodos de comunicação

export class Comms {
  private static instance: Comms;
  private constructor() {}

  static getInstance(): Comms {
    if (!Comms.instance) {
      Comms.instance = new Comms();
    }
    return Comms.instance;
  }
}
