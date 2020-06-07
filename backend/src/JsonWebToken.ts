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
    return jsonwebtoken.sign(JSON.stringify(object), secret, other);
  }

  private readonly config_: Config;
}
