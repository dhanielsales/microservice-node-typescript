import { Router } from 'express';

import { ProductsRepository } from '@app/v0/product';
import { UserRepository } from '@app/v0/user';

export class V0 {
  public readonly router: Router;
  public readonly user: UserRepository;
  public readonly product: ProductsRepository;

  constructor() {
    // Cria instancia de todas as apis V0
    this.router = Router();
    this.user = new UserRepository();
    this.product = new ProductsRepository();
  }
}
