import { Model } from './Model';
import { ServiceRequest, ServiceResponse } from './Service';
import { BlogValues } from './BlogEntry';
import BlogEntryService from './BlogEntryService';

const blogEntryMock: Model<BlogValues> = {
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

    const requestMock: ServiceRequest = { body: '' };
    const responseMock: ServiceResponse = {
      send: jest.fn(),
      status: jest.fn(() => responseMock),
    };
    await blogEntryApi.get(requestMock, responseMock);

    expect(responseMock.send).toHaveBeenCalledWith(
      '[{"content":"and it works","title":"this is vanilla mysql","id":1}]'
    );
  });
});
