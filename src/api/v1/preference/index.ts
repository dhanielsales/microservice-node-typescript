import { PreferenceRepository } from '@app/v1/preference';
import { ApiImpl, RequestMethod, Request, Response } from '@model/api';

export class PreferenceApi extends ApiImpl {
  constructor() {
    super();

    this.applyRoute(RequestMethod.GET, '/', this.index);
    this.applyRoute(RequestMethod.GET, '/:id', this.show);
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
