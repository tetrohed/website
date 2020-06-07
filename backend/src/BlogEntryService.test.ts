import { Model } from './Model';
import { ServiceRequest, ServiceResponse } from './Service';
import { BlogValues } from './BlogEntry';
import BlogEntryService from './BlogEntryService';

const blogEntryMock: Model<BlogValues> = {
  find: jest.fn(() => Promise.resolve([])),
  getAll: jest.fn(() =>
    Promise.resolve([
      {
        content: 'and it works',
        title: 'this is vanilla mysql',
        id: 1,
      },
    ])
  ),
  insert: jest.fn(),
};

describe('BlogService', function () {
  it('GET', async () => {
    const blogEntryApi = new BlogEntryService(blogEntryMock);

    const requestMock: ServiceRequest<BlogValues> = {
      headers: {},
      body: { title: 'Titel', content: ' useless content' },
    };
    const responseMock: ServiceResponse<BlogValues[]> = {
      send: jest.fn(),
      status: jest.fn(() => responseMock),
    };
    await blogEntryApi.get(requestMock, responseMock);

    expect(responseMock.send).toHaveBeenCalledWith([
      { content: 'and it works', title: 'this is vanilla mysql', id: 1 },
    ]);
  });
  it('POST', async () => {
    const blogEntryApi = new BlogEntryService(blogEntryMock);

    const requestMock: ServiceRequest<BlogValues> = {
      headers: {},
      body: {
        title: 'Lorem Ipsum',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
    };
    const responseMock: ServiceResponse<string> = {
      send: jest.fn(),
      status: jest.fn(() => responseMock),
    };
    await blogEntryApi.post(requestMock, responseMock);

    expect(responseMock.send).toHaveBeenCalledWith('Blog entry added');
    expect(blogEntryMock.insert).toHaveBeenCalledWith({
      title: 'Lorem Ipsum',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    });
  });
});
