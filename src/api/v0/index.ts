import { ProductApi } from '@api/v0/product';
import { UserApi } from '@api/v0/user';
import { ApiImpl } from '@model/api';

export class V0 extends ApiImpl {
  public readonly user: UserApi;
  public readonly product: ProductApi;

  constructor() {
    super();
    // Cria instancia de todas as apis V0
    this.user = new UserApi();
    this.product = new ProductApi();

    this.applyGroup('/user', this.user.getRouter());
    this.applyGroup('/product', this.product.getRouter());
  }
}
