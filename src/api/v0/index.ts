import { Router } from 'express';

import { ProductApi } from '@api/v0/product';
import { UserApi } from '@api/v0/user';

export class V0 {
  private static instance: V0;
  public readonly router: Router = Router();
  public readonly userApi: UserApi;
  public readonly productApi: ProductApi;

  private constructor() {
    // Cria instancia de todas as apis V0
    this.userApi = UserApi.getInstance();
    this.productApi = ProductApi.getInstance();

    this.router.use('/user', this.userApi.router);
    this.router.use('/product', this.productApi.router);
  }

  static getInstance(): V0 {
    if (!V0.instance) {
      V0.instance = new V0();
    }
    return V0.instance;
  }
}
