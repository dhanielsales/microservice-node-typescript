import { Preference } from '@model/preference';
import { Service } from '@service/index';

export class PreferenceRepository {
  private static instance: PreferenceRepository;
  private constructor() {}

  static getInstance(): PreferenceRepository {
    if (!PreferenceRepository.instance) {
      PreferenceRepository.instance = new PreferenceRepository();
    }
    return PreferenceRepository.instance;
  }

  public async getPreferences(): Promise<Preference[]> {
    const { store } = Service.getInstance();
    const { preference } = store.noSql;
    const result = await preference.getAll();

    return result;
  }

  public async getPreference(id: string): Promise<Preference | null> {
    const { store } = Service.getInstance();
    const { preference } = store.noSql;
    const result = await preference.getOne(id);

    if (result) {
      return result;
    }

    return null;
  }
}
