import { Model } from './Model';
import { mocked } from '@arminjazi/common';

import { UserValues } from './User';
import { ServiceRequest, ServiceResponse } from './Service';
import UserService, { AccessToken, LoginJwt } from './UserService';

const userMock: Model<UserValues> = {
  find: jest.fn(() =>
    Promise.resolve([
      {
        userName: 'arminjazi',
        password: 'cryptic',
        id: 1,
      },
    ])
  ),
  getAll: jest.fn(() =>
    Promise.resolve([
      {
        userName: 'arminjazi',
        password: 'cryptic',
        id: 1,
      },
    ])
  ),
  insert: jest.fn(),
};

const jwtMock: LoginJwt = {
  verify: jest.fn(),
  sign: jest.fn(),
};

describe('UserService', function () {
  it('Login', async () => {
    const userService = new UserService(userMock, jwtMock);

    const requestMock: ServiceRequest<UserValues> = {
      headers: {},
      body: { userName: 'armijazi', password: 'cryptic' },
    };
    const responseMock: ServiceResponse<AccessToken | string> = {
      send: jest.fn(),
      status: jest.fn(() => responseMock),
    };

    mocked(jwtMock.sign).mockImplementation(() => '12p8ljkasdlkj9P8');
    await userService.login(requestMock, responseMock);

    expect(responseMock.send).toHaveBeenCalledWith({
      accessToken: '12p8ljkasdlkj9P8',
    });
  });

  it('Login with false credentials', async () => {
    const userService = new UserService(userMock, jwtMock);

    const requestMock: ServiceRequest<UserValues> = {
      headers: {},
      body: { userName: 'armijazi', password: 'cryptic' },
    };
    const responseMock: ServiceResponse<AccessToken | string> = {
      send: jest.fn(),
      status: jest.fn(() => responseMock),
    };

    mocked(userMock.find).mockImplementation(() => []);
    await userService.login(requestMock, responseMock);

    expect(responseMock.send).toHaveBeenCalledWith(
      'Username or password incorrect'
    );
  });
});
