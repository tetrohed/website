import mysql from 'mysql';
import sleep from './sleep';

export type Options = {
  host: string;
  user: string;
  password: string;
  port: number;
};
export default class Database {
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
}
