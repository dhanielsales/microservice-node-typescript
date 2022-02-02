import { Api } from "@api/api";
import { Comms } from "@comms/comms";
import { Cache } from "@shared/infra/agregators/Cache";
import { Store } from "@store/store";

export interface ServiceConfig {
  store: Store;
  comms: Comms;
  cache: Cache;
  api: Api;
}