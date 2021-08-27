import '@shared/config/enviroment.config';
import { initServer } from '@shared/infra/server/server';
import { Store } from '@store/store';

(async () => {
  // Criando database connections
  const newStore = new Store();

  // Instancia o novo store na aplicação

  // Criando instancia do servidor
  await initServer();
})();
