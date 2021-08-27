import { Store } from '@store/store';

export let app: App;

export class App {
  public readonly store: Store;

  constructor(store: Store) {
    this.store = store;

    app = this;
  }
}
