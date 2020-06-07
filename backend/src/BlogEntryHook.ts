import { ServiceHook, ServiceRequestHeaders } from './Service';
import { BlogValues } from './BlogEntry';
import JwtAuthentication from './JwtAuthentication';

export default class BlogEntryHook implements ServiceHook<BlogValues> {
  constructor(authentication: JwtAuthentication) {
    this.authentication_ = authentication;
  }

  async beforePost(
    values: BlogValues,
    headers: ServiceRequestHeaders
  ): Promise<BlogValues> {
    await this.authentication_.authenticate(headers);
    return values;
  }

  private authentication_: JwtAuthentication;
}
