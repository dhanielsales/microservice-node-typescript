import { Comms } from '@comms/comms';
import { Store } from '@store/store';
import { Api } from '@api/api';
import { Cache } from '@shared/infra/agregators/cache';

export interface AppConfig {
  store: Store;
  comms: Comms;
  api: Api;
  cache: Cache;
}
