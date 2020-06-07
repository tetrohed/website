import axios from 'axios';
import { databaseConfig } from './Environment';
import Fixture from './Fixture';

const fixtures = new Fixture(databaseConfig);

describe('Integration', function () {
  beforeAll(async () => {
    await fixtures.setup();
    // high timeout value to make sure the db is up and running in ci
  }, 60000);
  afterAll(async () => {
    await fixtures.clean();
  });

  it('Has correct version', async () => {
    const response = await axios('http://localhost:3001');

    expect(response.data).toEqual('running with version: 1.0.0');
  });

  it('Logs in and Posts a blog entry', async () => {
    const loginResponse = await axios({
      url: 'http://localhost:3001/login',
      method: 'post',
      data: {
        userName: 'arminjazi',
        password: 'hashedPassword1',
      },
    });

    expect(loginResponse.data).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
      })
    );

    const { accessToken } = loginResponse.data;

    const addBlogEntryResponse = await axios({
      url: 'http://localhost:3001/blog/new',
      method: 'post',
      data: {
        title: 'Integration Test',
        content: 'is a good way to find subtle bugs',
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    expect(addBlogEntryResponse.data).toEqual('Blog entry added');

    const getBlogEntries = await axios({
      url: 'http://localhost:3001/blog',
      method: 'get',
    });

    expect(getBlogEntries.data).toEqual(
      expect.arrayContaining([
        { title: 'this is vanilla mysql', id: 1, content: 'and it works' },
        {
          title: 'should you make everything yourself',
          id: 2,
          content: 'if you have time and resources',
        },
        { title: 'should you use frameworks', id: 3, content: 'depends' },
        {
          title: 'Integration Test',
          id: 4,
          content: 'is a good way to find subtle bugs',
        },
      ])
    );
  });
});
