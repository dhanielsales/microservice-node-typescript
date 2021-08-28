import { Router } from 'express';

import { ProductApi } from '@api/v0/product';
import { UserApi } from '@api/v0/user';

export class V0 {
  public readonly router: Router = Router();
  public readonly userApi: UserApi;
  public readonly productApi: ProductApi;

  constructor() {
    // Cria instancia de todas as apis V0
    this.userApi = new UserApi();
    this.productApi = new ProductApi();

    this.router.use('user', this.userApi.router);
    this.router.use('product/', this.productApi.router);
  }
}
