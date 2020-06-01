import { BlogEntry, BlogValues } from './BlogEntry';

export interface ServiceRequest {}

export interface ServiceResponse {
  status: (code: number) => ServiceResponse;
  send: (value: string) => void;
}

export interface BlogEntryService {
  get: (request: ServiceRequest, response: ServiceResponse) => void;
}

export default class implements BlogEntryService {
  constructor(blogEntry: BlogEntry) {
    this.blogEntry_ = blogEntry;
  }

  public async get(request: ServiceRequest, response: ServiceResponse): void {
    try {
      const blogValues: BlogValues[] = await this.blogEntry_.getAll();

      response.status(200).send(JSON.stringify(blogValues));
    } catch (e) {
      response.status(404).send(e.message);
    }
  }

  private blogEntry_: BlogEntry;
}
