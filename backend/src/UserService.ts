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

    const user = this.model_.find((u) => {
      return u.userName === userName && u.password === password;
    });

    if (user) {
      const accessToken = this.jwt_.sign(user);

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
