import { EnsureAuthenticated } from '@api/middlewares/decorators/ensureAuthenticated';
import { UserRepository } from '@app/v0/user';
import { ApiImpl, RequestMethod, Request, Response } from '@model/api';

export class UserApi extends ApiImpl {
  constructor() {
    super();

    this.applyRoute(RequestMethod.GET, '/', this.index);
    this.applyRoute(RequestMethod.GET, '/:id', this.show);
  }

  async index(_: Request, response: Response) {
    const repository = UserRepository.getInstance();
    const data = await repository.getUsers();

    return response.json(data);
  }

  @EnsureAuthenticated()
  async show(request: Request, response: Response) {
    const { id } = request.params;
    const repository = UserRepository.getInstance();
    const data = await repository.getUser(id);

    return response.status(200).json(data);
  }
}
