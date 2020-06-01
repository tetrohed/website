import DatabaseConnection from './DatabaseConnection';
import DatabaseAdmin from './DatabaseAdmin';
import BlogEntry from './BlogEntry';

const adminOptions = {
  host: 'localhost',
  user: 'root',
  password: 'testpassword',
  port: 6603,
};

const databaseConnection = new DatabaseConnection(adminOptions);
const dbAdmin = new DatabaseAdmin(databaseConnection);

describe('BlogEntry', () => {
  beforeAll(async () => {
    await dbAdmin.addDb('test_db');
    await dbAdmin.addTable('test_db', 'BlogEntry', [
      {
        name: 'Title',
        dataType: 'TEXT' as const,
        size: 255,
      },
      {
        name: 'id',
        dataType: 'INT' as const,
        autoIncrement: true,
        primaryKey: true,
      },
      {
        name: 'Content',
        dataType: 'TEXT' as const,
      },
    ]);
    // high timeout value to make sure the db is up and running in ci
  }, 60000);
  afterAll(async () => {
    await dbAdmin.dropDb('test_db');
  });
  it('inserts rows into blog entry and queries those rows', async () => {
    const blogEntry = new BlogEntry(databaseConnection, 'BlogEntry', 'test_db');
    await blogEntry.insert({
      title: 'this is vanilla mysql',
      content: 'and it works',
    });

    const allBlogEntries = await blogEntry.getAll();
    expect(allBlogEntries).toEqual([
      { Content: 'and it works', Title: 'this is vanilla mysql', id: 1 },
    ]);
  });
});
