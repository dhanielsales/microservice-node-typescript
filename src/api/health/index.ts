import { Check } from '@api/health/check';
import { ApiImpl } from '@model/api';

export class Health extends ApiImpl {
  public readonly check: Check;

  constructor() {
    super();
    this.check = new Check();

    this.applyGroup('/check', this.check.getRouter());
  }
}
