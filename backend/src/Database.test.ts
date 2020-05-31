import Database from './Database';
import DatabaseAdmin from './DatabaseAdmin';

const adminOptions = {
  host: 'localhost',
  user: 'root',
  password: 'testpassword',
  port: 6603,
};

const database = new Database();
const dbAdmin = new DatabaseAdmin(database, adminOptions);

describe('database', () => {
  beforeAll(async () => {
    await dbAdmin.addDb('test_db');
    // high timeout value to make sure the db is up and running in ci
  }, 60000);
  afterAll(async () => {
    await dbAdmin.dropDb('test_db');
  });
  it('constructs', () => {
    const database = new Database();
    expect(database).toBeTruthy();
  });
  it('connects', async () => {
    const database = new Database();
    const connection = await database.connect(adminOptions);
    await expect(connection).toBeTruthy();
    return new Promise((resolve, reject) => {
      connection.end((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  });
});
