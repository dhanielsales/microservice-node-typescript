import { EnsureAuthenticated } from '@api/middlewares/decorators/ensureAuthenticated';
import { UserRepository } from '@app/v0/user';
import { Router, Request, Response } from 'express';

export class UserApi {
  private static instance: UserApi;
  public readonly router: Router = Router();

  private constructor() {
    this.router.get('/', this.index);
    this.router.get('/:id', this.show);
  }

  static getInstance(): UserApi {
    if (!UserApi.instance) {
      UserApi.instance = new UserApi();
    }
    return UserApi.instance;
  }

  async index(_: Request, response: Response): Promise<any> {
    const repository = UserRepository.getInstance();
    const data = await repository.getUsers();

    return response.json(data);
  }

  @EnsureAuthenticated()
  async show(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    const repository = UserRepository.getInstance();
    const data = await repository.getUser(id);

    return response.status(200).json(data);
  }
}
