import { EnsureAuthenticated } from '@api/middlewares/decorators/ensureAuthenticated';
import { UserRepository } from '@app/v1/user';
import { validateUserCreate, validateUserUpdate } from '@model/user';
import { Router, Request, Response } from 'express';

export class UserApi {
  private static instance: UserApi;
  router: Router = Router();

  private constructor() {
    this.router.get('/', this.index);
    this.router.get('/:id', this.show);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }

  static getInstance(): UserApi {
    if (!UserApi.instance) {
      UserApi.instance = new UserApi();
    }
    return UserApi.instance
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

  async create(request: Request, response: Response): Promise<any> {
    const payload = request.body;
    const user = await validateUserCreate(payload);

    const repository = UserRepository.getInstance();
    const data = await repository.addUser(user);

    return response.status(200).json(data);
  }

  async update(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    const payload = request.body;
    const user = await validateUserUpdate(payload);

    const repository = UserRepository.getInstance();
    const data = await repository.updateUser(user, id);

    return response.status(200).json(data);
  }

  async delete(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    const repository = UserRepository.getInstance();
    await repository.removeUser(id);

    return response.status(200).end();
  }
}
