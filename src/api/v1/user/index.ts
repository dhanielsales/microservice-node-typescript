import { EnsureAuthenticated } from '@api/middlewares/decorators/ensureAuthenticated';
import { UserRepository } from '@app/v1/user';
import { validateUserCreate, validateUserUpdate } from '@model/user';
import { ApiImpl, RequestMethod, Request, Response } from '@model/api';

export class UserApi extends ApiImpl {
  constructor() {
    super();

    this.applyRoute(RequestMethod.GET, '/', this.index);
    this.applyRoute(RequestMethod.GET, '/:id', this.show);
    this.applyRoute(RequestMethod.POST, '/', this.create);
    this.applyRoute(RequestMethod.PUT, '/:id', this.update);
    this.applyRoute(RequestMethod.DELETE, '/:id', this.delete);
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
