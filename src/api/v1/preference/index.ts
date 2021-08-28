import { PreferenceRepository } from '@app/v1/preference';
import { Router, Request, Response } from 'express';

export class PreferenceApi {
  router: Router = Router();

  constructor() {
    this.router.get('/', this.index);
    this.router.get('/:id', this.show);
  }

  async index(_: Request, response: Response): Promise<any> {
    const repository = new PreferenceRepository();
    const data = await repository.getPreferences();

    return response.json(data);
  }

  async show(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    const repository = new PreferenceRepository();
    const data = await repository.getPreference(id);

    return response.status(200).json(data);
  }
}
