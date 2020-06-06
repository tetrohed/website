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
});
