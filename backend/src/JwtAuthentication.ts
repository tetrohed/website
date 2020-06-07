import { LoginJwt } from './UserService';
import { ServiceRequestHeaders } from './Service';

export default class JwtAuthentication {
  constructor(jwt: LoginJwt) {
    this.jwt_ = jwt;
  }

  authenticate(headers: ServiceRequestHeaders): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const authHeader = headers.authorization;
      if (authHeader) {
        const token = authHeader.split(' ')[1];

        this.jwt_.verify(token, (error) => {
          if (error) reject(error);
          else resolve(true);
        });
      } else {
        reject(new Error('missing authorization token'));
      }
    });
  }

  private readonly jwt_: LoginJwt;
}
