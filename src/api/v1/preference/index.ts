import { PreferenceRepository } from '@app/v1/preference';
import { Router, Request, Response } from 'express';

export class PreferenceApi {
  private static instance: PreferenceApi;
  router: Router = Router();

  private constructor() {
    this.router.get('/', this.index);
    this.router.get('/:id', this.show);
  }

  static getInstance(): PreferenceApi {
    if (!PreferenceApi.instance) {
      PreferenceApi.instance = new PreferenceApi();
    }
    return PreferenceApi.instance;
  }

  async index(_: Request, response: Response): Promise<any> {
    const repository = PreferenceRepository.getInstance();
    const data = await repository.getPreferences();

    return response.json(data);
  }

  async show(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    const repository = PreferenceRepository.getInstance();
    const data = await repository.getPreference(id);

    return response.status(200).json(data);
  }
}
