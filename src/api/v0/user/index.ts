import { EnsureAuthenticated } from '@shared/presentation/middlewares/decorators/ensureAuthenticated';
import { UserRepository } from '@app/v0/user';
import { Router, Request, Response } from 'express';

export class User {
  public readonly router: Router = Router();

  constructor() {
    this.router.get('/', this.index);
    this.router.get('/:id', this.show);
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
