import { Store } from '@store/store';
import { Comms } from '@comms/comms';
import { Api } from '@api/api';

import { AppConfig } from '@model/app';
import { Cache } from '@shared/infra/agregators/cache';

export let app: App;
export class App {
  public readonly store: Store;
  public readonly comms: Comms;
  public readonly api: Api;
  public readonly cache: Cache;

  constructor({ store, comms, api, cache }: AppConfig) {
    this.store = store;
    this.comms = comms;
    this.api = api;
    this.cache = cache;

    app = this;
  }
}
