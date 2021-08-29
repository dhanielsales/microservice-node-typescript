export interface Cache {
  get<I>(key: string | Buffer): Promise<I>;
  set<I>(key: string | Buffer, payload: any): Promise<string>;
}
