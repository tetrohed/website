import mysql from 'mysql';
import sleep from './sleep';

export type Options = {
  host: string;
  user: string;
  password: string;
  port: number;
  database?: string;
};

export default class DatabaseConnection {
  constructor(options: Options) {
    this.options_ = options;
  }

  public connect(options: Options): Promise<mysql.Connection> {
    const connection = mysql.createConnection(options);
    return new Promise((resolve, reject) => {
      connection.connect((error: Error) => {
        if (error) reject(error);
        else resolve(connection);
      });
    });
  }

  public async connectRetry(options: Options): Promise<mysql.Connection> {
    try {
      return await this.connect(options);
    } catch (e) {
      console.log(`Could not connect to MySql because: ${e.code}`);
      await sleep(1000);
      return this.connectRetry(options);
    }
  }

  public async raw(query: string, db?: string): Promise<any> {
    const connection: mysql.Connection = await this.connectRetry(
      db
        ? {
            ...this.options_,
            database: db,
          }
        : this.options_
    );
    return new Promise((resolve, reject) => {
      connection.query(query, function (error, result) {
        if (error) {
          console.log(`query ${query} failed`, error);
          reject(error);
        } else {
          resolve(result);
        }
        connection.end((endError) => {
          if (endError) reject(endError);
        });
      });
    });
  }

  private readonly options_: Options;
}
