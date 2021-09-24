import { PreferenceApi } from '@api/v1/preference';
import { ProductApi } from '@api/v1/product';
import { UserApi } from '@api/v1/user';
import { ApiImpl } from '@model/api';

export class V1 extends ApiImpl {
  public readonly user: UserApi;
  public readonly product: ProductApi;
  public readonly preference: PreferenceApi;

  constructor() {
    super()
    // Cria instancia de todas as apis V1
    this.user = new UserApi();
    this.product = new ProductApi();
    this.preference = new PreferenceApi();

    this.applyGroup('/user', this.user.getRouter());
    this.applyGroup('/product', this.product.getRouter());
    this.applyGroup('/preference', this.preference.getRouter());
  }
}
