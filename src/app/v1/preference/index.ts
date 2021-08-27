import { Preference } from '@model/preference';

const preferenceMock: Preference[] = [
  {
    id: '1',
    autoPrint: false,
    theme: 'dark',
  },
  {
    id: '2',
    autoPrint: false,
    theme: 'light',
  },
];

export class PreferenceRepository {
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
