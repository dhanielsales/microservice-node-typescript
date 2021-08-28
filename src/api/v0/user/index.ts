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

  async show(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    const repository = new UserRepository();
    const data = await repository.getUser(id);

    // TODO: transferir validação para dentro do repository ?

    return response.status(data ? 200 : 404).json(data);
  }

  async create(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    const repository = new UserRepository();
    const data = await repository.getUser(id);

    // TODO: transferir validação para dentro do repository ?

    return response.status(data ? 200 : 404).json(data);
  }

  async update(_: Request, response: Response): Promise<any> {
    return response.status(404).end();
  }

  async delete(_: Request, response: Response): Promise<any> {
    return response.status(404).end();
  }
}
