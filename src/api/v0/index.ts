import { Router } from 'express';

import { Product } from '@api/v0/product';
import { User } from '@api/v0/user';

export class V0 {
  public readonly router: Router = Router();
  public readonly user: User;
  public readonly product: Product;

  constructor() {
    this.user = new User();
    this.product = new Product();

    this.router.use('/user', this.user.router);
    this.router.use('/product', this.product.router);
  }
}
