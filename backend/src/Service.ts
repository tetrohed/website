import { Model } from './Model';

export interface ServiceRequest {
  body: string;
}

export interface ServiceResponse {
  status: (code: number) => ServiceResponse;
  send: (value: string) => void;
}

interface Encoder {
  encode<T>(data: T | T[]): string;
}

interface Decoder {
  decode<T>(data: string): T;
}

class DefaultEncoder<T> implements Encoder {
  encode<T>(data: T | T[]): string {
    return JSON.stringify(data);
  }
}

class DefaultDecoder<T> implements Decoder {
  decode<T>(data: string): T {
    return JSON.parse(data);
  }
}

export default class Service<T> {
  constructor(
    user: Model<T>,
    encoder: Encoder = new DefaultEncoder(),
    decoder: Decoder = new DefaultDecoder()
  ) {
    this.model_ = user;
    this.encoder_ = encoder;
    this.decoder_ = decoder;
  }

  public async get(
    request: ServiceRequest,
    response: ServiceResponse
  ): Promise<void> {
    try {
      const values = await this.model_.getAll();

      response.status(200).send(this.encoder_.encode(values));
    } catch (e) {
      response.status(404).send(e.message);
    }
  }

  public readonly model_: Model<T>;

  public readonly encoder_: Encoder;

  public readonly decoder_: Decoder;
}
