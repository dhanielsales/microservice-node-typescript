import { Router } from 'express';

import { PreferenceRepository } from '@app/v1/preference';
import { ProductsRepository } from '@app/v1/product';
import { UserRepository } from '@app/v1/user';

export class V1 {
  public readonly router: Router;
  public readonly user: UserRepository;
  public readonly product: ProductsRepository;
  public readonly preference: PreferenceRepository;

  constructor() {
    // Cria instancia de todas as apis V1
    this.router = Router();
    this.user = new UserRepository();
    this.product = new ProductsRepository();
    this.preference = new PreferenceRepository();
  }
}
