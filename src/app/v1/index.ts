import { Router } from 'express';

import { PreferenceRepository } from '@app/v1/preference';
import { ProductsRepository } from '@app/v1/product';
import { UserRepository } from '@app/v1/user';

export class V1 {
  private static instance: V1;
  public readonly router: Router;
  public readonly user: UserRepository;
  public readonly product: ProductsRepository;
  public readonly preference: PreferenceRepository;

  private constructor() {
    // Cria instancia de todas as apis V1
    this.router = Router();
    this.user = UserRepository.getInstance();
    this.product = ProductsRepository.getInstance();
    this.preference = PreferenceRepository.getInstance();
  }

  static getInstance(): V1 {
    if (!V1.instance) {
      V1.instance = new V1();
    }
    return V1.instance;
  }
}
