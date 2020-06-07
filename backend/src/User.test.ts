import DatabaseConnection from './DatabaseConnection';
import { databaseConfig } from './Environment';
import Fixture from './Fixture';
import User from './User';

const databaseConnection = new DatabaseConnection(databaseConfig);
const fixtures = new Fixture(databaseConfig);

describe('User', () => {
  beforeAll(async () => {
    await fixtures.setup();
    // high timeout value to make sure the db is up and running in ci
  }, 60000);
  afterAll(async () => {
    await fixtures.clean();
  });
  it('inserts rows into user and queries those users', async () => {
    const user = new User(databaseConnection, databaseConfig.dbName);

    const users = await user.getAll();

    expect(users).toEqual(
      expect.arrayContaining([
        {
          userName: 'arminjazi',
          password: 'hashedPassword1',
          id: expect.any(Number),
        },
        {
          userName: 'arashjazi',
          password: 'hashedPassword2',
          id: expect.any(Number),
        },
        {
          userName: 'joe',
          password: 'hashedPassword3',
          id: expect.any(Number),
        },
      ])
    );
  });

  it('finds an existing user', async () => {
    const user = new User(databaseConnection, databaseConfig.dbName);

    const foundUser = await user.find({
      userName: 'arashjazi',
      password: 'hashedPassword2',
    });

    expect(foundUser).toEqual([
      expect.objectContaining({
        userName: 'arashjazi',
        password: 'hashedPassword2',
        id: expect.any(Number),
      }),
    ]);
  });

  it('does not find non-existing user', async () => {
    const user = new User(databaseConnection, databaseConfig.dbName);

    const noUsers = await user.find({
      userName: 'i never registered',
      password: 'and have no password',
    });

    expect(noUsers).toEqual([]);
  });
});
