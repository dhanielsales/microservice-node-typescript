import { Store } from '@store/store';
import { Comms } from '@comms/comms';
import { Api } from '@api/api';

import { AppConfig } from '@model/app';

export let app: App;
export class App {
  public readonly store: Store;
  public readonly comms: Comms;
  public readonly api: Api;

  constructor({ store, comms, api }: AppConfig) {
    this.store = store;
    this.comms = comms;
    this.api = api;

    app = this;
  }
}
