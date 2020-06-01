import { BlogEntry } from './BlogEntry';
import BlogEntryApi, {
  ServiceRequest,
  ServiceResponse,
} from './BlogEntryService';

const blogEntryMock: BlogEntry = {
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

describe('BlogApi', function () {
  it('GET', async () => {
    const blogEntryApi = new BlogEntryApi(blogEntryMock);

    const requestMock: ServiceRequest = {};
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
