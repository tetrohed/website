import { Model } from './Model';
import { mocked } from '@arminjazi/common';
import Service, {
  ServiceHook,
  ServiceRequest,
  ServiceResponse,
} from './Service';

interface ModelValues {
  key: string;
}

const modelMock: Model<ModelValues> = {
  find: jest.fn(() => Promise.resolve([])),
  getAll: jest.fn(() =>
    Promise.resolve([
      {
        key: 'value',
      },
    ])
  ),
  insert: jest.fn(),
};

const hookMock: ServiceHook<ModelValues> = {
  beforePost: jest.fn(),
};

describe('UserService', function () {
  it('GET with default encoder', async () => {
    const service = new Service(modelMock);

    const requestMock: ServiceRequest<ModelValues> = {
      headers: {},
      body: { key: 'some value' },
    };
    const responseMock: ServiceResponse<ModelValues[]> = {
      send: jest.fn(),
      status: jest.fn(() => responseMock),
    };
    await service.get(requestMock, responseMock);

    expect(responseMock.send).toHaveBeenCalledWith([{ key: 'value' }]);
  });

  it('POST calls beforeHook before sending response', async () => {
    const service = new Service(modelMock, hookMock);

    const requestMock: ServiceRequest<ModelValues> = {
      headers: {},
      body: { key: 'some value' },
    };
    const responseMock: ServiceResponse<string> = {
      send: jest.fn(),
      status: jest.fn(() => responseMock),
    };
    mocked(hookMock.beforePost).mockImplementation(() =>
      Promise.reject(new Error('hook with error'))
    );

    await service.post(requestMock, responseMock);

    expect(responseMock.send).toHaveBeenCalledWith('hook with error');
    expect(responseMock.status).toHaveBeenCalledWith(404);
  });

  it('POST calls response with modified values of beforeHook', async () => {
    const service = new Service(modelMock, hookMock);

    const requestMock: ServiceRequest<ModelValues> = {
      headers: {},
      body: { key: 'some value' },
    };
    const responseMock: ServiceResponse<string> = {
      send: jest.fn(),
      status: jest.fn(() => responseMock),
    };

    mocked(hookMock.beforePost).mockImplementation(() =>
      Promise.resolve('resolve hook values')
    );

    await service.post(requestMock, responseMock);

    expect(responseMock.send).toHaveBeenCalledWith('Blog entry added');
    expect(responseMock.status).toHaveBeenCalledWith(200);
  });
});
