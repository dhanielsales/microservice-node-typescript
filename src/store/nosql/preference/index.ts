import { Preference } from '@model/preference';
// import { NoSqlConnection } from '@model/noSql';

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

export class PreferenceStore {
  private static instance: PreferenceStore;
  private constructor() {}

  static getInstance(): PreferenceStore {
    if (!PreferenceStore.instance) {
      PreferenceStore.instance = new PreferenceStore();
    }
    return PreferenceStore.instance;
  }

  public async getOne(id: string): Promise<Preference> {
    const preference = preferenceMock.filter(preference => preference.id === id)[0];

    return preference;
  }

  public async getAll(): Promise<Preference[]> {
    const preferences = preferenceMock;

    return preferences;
  }
}
