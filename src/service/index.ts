import { Store } from '@store/store';
import { Comms } from '@comms/comms';
import { Api } from '@api/api';
import { Cache } from '@shared/infra/agregators/Cache';

export class Service {
  private static instance: Service;
  public readonly store: Store;
  public readonly comms: Comms;
  public readonly cache: Cache;
  public readonly api: Api;

  private constructor() {
    this.store = Store.getInstance()
    this.comms = Comms.getInstance()
    this.cache = Cache.getInstance()
    this.api = Api.getInstance()
  }

  static getInstance(): Service {
    if (!Service.instance) {
      Service.instance = new Service();
    }
    return Service.instance;
  }

  // TODO Faz sentido realmente dessa forma?
  async start(): Promise<void> {
    if (this.api) {
      return await this.api.initServer(Service.instance)
    }
  }
}
    
