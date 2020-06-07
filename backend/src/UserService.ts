import Service, {
  DefaultHook,
  ServiceHook,
  ServiceRequest,
  ServiceResponse,
} from './Service';
import { UserValues } from './User';
import { Model } from './Model';

export interface LoginJwt {
  sign: (userValues: UserValues) => string;
  verify: (
    token: string,
    callback: (error: Error | null, decoded: object | undefined) => void
  ) => void;
}

export type AccessToken = { accessToken: string };

export default class extends Service<UserValues> {
  constructor(
    user: Model<UserValues>,
    jwt: LoginJwt,
    hook: ServiceHook<UserValues> = new DefaultHook()
  ) {
    super(user, hook);
    this.jwt_ = jwt;
  }

  public async login(
    request: ServiceRequest<UserValues>,
    response: ServiceResponse<AccessToken | string>
  ): Promise<void> {
    try {
      const { userName, password } = request.body;

      const user = await this.model_.find({ userName, password });
      if (user.length) {
        const accessToken = this.jwt_.sign(user[0]);

        response.send({ accessToken });
      } else {
        response.send('Username or password incorrect');
      }
    } catch (e) {
      response.status(404).send(e.message);
    }
  }

  public jwt_: LoginJwt;
}
