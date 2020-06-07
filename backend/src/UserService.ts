import Service, { ServiceRequest, ServiceResponse } from './Service';
import { UserValues } from './User';
import { Model } from './Model';

export interface LoginJwt {
  sign: (userValues: UserValues) => string;
}

export default class extends Service<UserValues> {
  constructor(user: Model<UserValues>, jwt: LoginJwt) {
    super(user);
    this.jwt_ = jwt;
  }

  public async login(
    request: ServiceRequest,
    response: ServiceResponse
  ): Promise<void> {
    const { userName, password } = this.decoder_.decode(request.body);

    const user = await this.model_.find({ userName, password });

    if (user.length) {
      const accessToken = this.jwt_.sign(user[0]);

      response.send(
        this.encoder_.encode({
          accessToken,
        })
      );
    } else {
      response.send('Username or password incorrect');
    }
  }

  public jwt_: LoginJwt;
}
