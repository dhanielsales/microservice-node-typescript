import { Router } from 'express';

import { Preference } from '@api/v1/preference';
import { Product } from '@api/v1/product';
import { User } from '@api/v1/user';

export class V1 {
  public readonly router: Router = Router();

  public readonly user: User;
  public readonly product: Product;
  public readonly preference: Preference;

  constructor() {
    this.user = new User();
    this.product = new Product();
    this.preference = new Preference();

    this.router.use('/user', this.user.router);
    this.router.use('/product', this.product.router);
    this.router.use('/preference', this.preference.router);
  }
}
