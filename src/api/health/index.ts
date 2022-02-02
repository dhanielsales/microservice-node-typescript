import { Router } from 'express';
import { Check } from '@api/health/check';

export class Health {
  public readonly router: Router = Router();
  public readonly check: Check;

  constructor() {
    this.check = new Check();

    this.router.use('/check', this.check.router);
  }
}
