import '@shared/config/enviroment.config';

import { Service } from '@service/index';

(async () => {
  // Instanciando a singleton de serviço
  const service = Service.getInstance();

  // Iniciando o serviço
  await service.start();
})();
