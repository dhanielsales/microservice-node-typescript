import '@shared/config/enviroment.config';

import { App } from '@app/app';
import { Store } from '@store/store';
import { Comms } from '@comms/comms';
import { Api } from '@api/api';
import { AppConfig } from '@model/app';

import { initServer } from '@shared/infra/server/server';

(async () => {
  // Criando instancia de conecções com o banco de dados
  const store = new Store();

  // Criando instancia de comunicações
  const comms = new Comms();

  // Criando instancia de comunicações
  const api = new Api();

  // Criando configurações para o App
  const appConfig: AppConfig = {
    api,
    store,
    comms,
  };

  // Instancia o novo App
  const app = new App(appConfig);

  // Criando instancia do servidor
  await initServer(app);
})();
