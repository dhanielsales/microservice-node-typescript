import { Router } from 'express';

import { ProductsRepository } from '@app/v0/product';
import { UserRepository } from '@app/v0/user';

export class V0 {
  private static instance: V0;
  public readonly router: Router;
  public readonly user: UserRepository;
  public readonly product: ProductsRepository;

  private constructor() {
    // Cria instancia de todas as apis V0
    this.router = Router();
    this.user = UserRepository.getInstance();
    this.product = ProductsRepository.getInstance();
  }

  static getInstance(): V0 {
    if (!V0.instance) {
      V0.instance = new V0();
    }
    return V0.instance;
  }
}
