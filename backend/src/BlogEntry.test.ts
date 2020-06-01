import BlogEntry from './BlogEntry';
import DatabaseConnection from './DatabaseConnection';
import { databaseConfig } from './Environment';

const databaseConnection = new DatabaseConnection(databaseConfig);

describe('BlogEntry', () => {
  beforeAll(async () => {
    await import('./addFixtures');
    // high timeout value to make sure the db is up and running in ci
  }, 60000);
  afterAll(async () => {
    await import('./cleanFixtures');
  });
  it('inserts rows into blog entry and queries those rows', async () => {
    const blogEntry = new BlogEntry(databaseConnection, 'BlogEntry', 'test_db');

    const allBlogEntries = await blogEntry.getAll();

    expect(allBlogEntries).toEqual(
      expect.arrayContaining([
        {
          content: 'depends',
          title: 'should you use frameworks',
          id: expect.any(Number),
        },
        {
          content: 'and it works',
          title: 'this is vanilla mysql',
          id: expect.any(Number),
        },
        {
          content: 'if you have time and resources',
          title: 'should you make everything yourself',
          id: expect.any(Number),
        },
      ])
    );
  });
});