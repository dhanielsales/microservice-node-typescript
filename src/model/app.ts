import { Comms } from '@comms/comms';
import { Store } from '@store/store';
import { Api } from '@api/api';

export interface AppConfig {
  store: Store;
  comms: Comms;
  api: Api;
}
