import { mocked } from '@arminjazi/common';
import { LoginJwt } from './UserService';
import JwtAuthentication from './JwtAuthentication';

const jwtMock: LoginJwt = {
  verify: jest.fn(),
  sign: jest.fn(),
};

describe('JwtAuthentication', function () {
  it('verifies authentication token', async () => {
    const jwtAuthenticate = new JwtAuthentication(jwtMock);

    mocked(jwtMock.verify).mockImplementation((token, callback) => {
      callback();
    });
    await expect(
      jwtAuthenticate.authenticate({
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      })
    ).resolves.toBeTruthy();
  });

  it('rejects corrupted authentication token', async () => {
    const jwtAuthenticate = new JwtAuthentication(jwtMock);

    mocked(jwtMock.verify).mockImplementation((token, callback) => {
      callback(new Error('some error'));
    });
    await expect(
      jwtAuthenticate.authenticate({
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      })
    ).rejects.toEqual(new Error('some error'));
  });
});
