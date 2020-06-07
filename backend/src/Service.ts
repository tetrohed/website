import { Model } from './Model';

export type ServiceRequestHeaders = Record<string, any>;

export interface ServiceRequest<T> {
  body: T;
  headers: ServiceRequestHeaders;
}

export interface ServiceResponse<T> {
  status: (code: number) => ServiceResponse<T>;
  send: (value: T) => void;
}

export interface ServiceHook<T> {
  beforePost: (values: T, headers: ServiceRequestHeaders) => Promise<T>;
}

export class DefaultHook<T> implements ServiceHook<T> {
  public beforePost(values: T): Promise<T> {
    return new Promise((resolve) => resolve(values));
  }
}

export default class Service<T> {
  constructor(user: Model<T>, hook: ServiceHook<T> = new DefaultHook()) {
    this.model_ = user;
    this.hook_ = hook;
  }

  public async get(
    request: ServiceRequest<T>,
    response: ServiceResponse<T[]>
  ): Promise<void> {
    try {
      const values = await this.model_.getAll();

      response.status(200).send(values);
    } catch (e) {
      response.status(404).send(e.message);
    }
  }

  async post(
    request: ServiceRequest<T>,
    response: ServiceResponse<string>
  ): Promise<void> {
    try {
      const headers = request.headers;
      const hookValues = await this.hook_.beforePost(request.body, headers);
      await this.model_.insert(hookValues);
      response.status(200).send('Blog entry added');
    } catch (e) {
      response.status(404).send(e.message);
    }
  }

  protected readonly model_: Model<T>;

  private hook_: ServiceHook<T>;
}
