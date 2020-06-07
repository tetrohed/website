import { Model } from './Model';

import Service, { ServiceRequest, ServiceResponse } from './Service';

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

const encoderMock = {
  encode: jest.fn(),
};

describe('UserService', function () {
  it('GET with default encoder', async () => {
    const service = new Service(modelMock);

    const requestMock: ServiceRequest = { body: '' };
    const responseMock: ServiceResponse = {
      send: jest.fn(),
      status: jest.fn(() => responseMock),
    };
    await service.get(requestMock, responseMock);

    expect(responseMock.send).toHaveBeenCalledWith('[{"key":"value"}]');
  });

  it('GET with data encoder', async () => {
    const service = new Service(modelMock, encoderMock);

    encoderMock.encode.mockImplementation((data) => {
      return JSON.stringify(data);
    });
    const requestMock: ServiceRequest = { body: '' };
    const responseMock: ServiceResponse = {
      send: jest.fn(),
      status: jest.fn(() => responseMock),
    };
    await service.get(requestMock, responseMock);

    expect(responseMock.send).toHaveBeenCalledWith('[{"key":"value"}]');
  });
});
