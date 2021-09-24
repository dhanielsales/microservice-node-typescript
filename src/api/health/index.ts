import { Router } from 'express';

import { Check } from '@api/health/check';

export class Health {
  private static instance: Health;
  public readonly router: Router;
  public readonly check: Check;

  private constructor() {
    this.router = Router();
    this.check = Check.getInstance();

    this.router.use('/check', this.check.router);
  }

  static getInstance(): Health {
    if (!Health.instance) {
      Health.instance = new Health();
    }
    return Health.instance;
  }
}
