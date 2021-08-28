import { EnsureAuthenticated } from '@api/middlewares/decorators/ensureAuthenticated';
import { UserRepository } from '@app/v1/user';
import { Router, Request, Response } from 'express';

export class UserApi {
  router: Router = Router();

  constructor() {
    this.router.get('/', this.index);
    this.router.get('/:id', this.show);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }

  async index(_: Request, response: Response): Promise<any> {
    const repository = new UserRepository();
    const data = await repository.getUsers();

    return response.json(data);
  }

  @EnsureAuthenticated()
  async show(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    const repository = new UserRepository();
    const data = await repository.getUser(id);

    return response.status(200).json(data);
  }

  async create(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    // TODO: validate request body

    const repository = new UserRepository();
    const data = await repository.getUser(id);

    return response.status(200).json(data);
  }

  async update(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    // TODO: validate request body

    const repository = new UserRepository();
    const data = await repository.getUser(id);

    return response.status(200).json(data);
  }

  async delete(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    const repository = new UserRepository();
    await repository.removeUser(id);

    return response.status(200).end();
  }
}
