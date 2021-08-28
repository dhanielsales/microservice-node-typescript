import { Router } from 'express';

import { PreferenceApi } from '@api/v1/preference';
import { ProductApi } from '@api/v1/product';
import { UserApi } from '@api/v1/user';

export class V1 {
  public readonly router: Router;
  public readonly userApi: UserApi;
  public readonly productApi: ProductApi;
  public readonly preferenceApi: PreferenceApi;

  constructor() {
    // Cria instancia de todas as apis V1
    this.router = Router();
    this.userApi = new UserApi();
    this.productApi = new ProductApi();
    this.preferenceApi = new PreferenceApi();

    this.router.use('user/', this.userApi.router);
    this.router.use('product/', this.productApi.router);
    this.router.use('preference/', this.preferenceApi.router);
  }
}

// import { Router } from 'express';

// import { ProductApi } from '@api/v1/product';
// import { UserApi } from '@api/v1/user';

// const v1 = Router();

// const user = new UserApi();
// const product = new ProductApi();

// v1.use('/user', user.router);
// v1.use('/product', product.router);

// export { v1 };
