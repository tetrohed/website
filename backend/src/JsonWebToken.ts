import jsonwebtoken from 'jsonwebtoken';

export interface Config {
  secret: string;
  expiresIn?: string | number;
}

export default class {
  constructor(config: Config) {
    this.config_ = config;
  }

  public sign<T>(object: T): string {
    const { secret, ...other } = this.config_;
    let jwt = '';

    try {
      jwt = jsonwebtoken.sign({ object }, secret, other);
    } catch (e) {
      console.error(e);
      throw e;
    }

    return jwt;
  }

  public verify(
    token: string,
    callback: (error: Error | null, decoded: object | undefined) => void
  ): void {
    const { secret } = this.config_;
    jsonwebtoken.verify(token, secret, callback);
  }

  private readonly config_: Config;
}
