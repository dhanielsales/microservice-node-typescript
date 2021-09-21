import { Preference } from '@model/preference';

export class PreferenceRepository {
  private static instance: PreferenceRepository;
  private constructor() { }

  static getInstance(): PreferenceRepository {
    if (!PreferenceRepository.instance) {
        PreferenceRepository.instance = new PreferenceRepository();
    }
    return PreferenceRepository.instance;
  }

  public async getPreferences(): Promise<Preference[]> {
    const preference = preferenceMock;

    return preference;
  }

  public async getPreference(id: string): Promise<Preference | null> {
    const preference = preferenceMock.filter(preference => preference.id === id)[0];

    if (preference) {
      return preference;
    }

    return null;
  }
}
