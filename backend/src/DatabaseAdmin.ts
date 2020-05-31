import Database, { Options } from './Database';
import mysql from 'mysql';

export default class DatabaseAdmin {
  constructor(database: Database, options: Options) {
    this.database_ = database;
    this.options_ = options;
  }

  public async addDb(name: string): Promise<void> {
    const connection: mysql.Connection = await this.database_.connect(
      this.options_
    );
    return new Promise<void>((resolve, reject) => {
      connection.query(`CREATE DATABASE ${name}`, function (error, result) {
        if (error) reject(error);
        else {
          console.log('Database created', result);
          connection.end((endError) => {
            if (endError) reject(endError);
            else resolve();
          });
        }
      });
    });
  }

  public async dropDb(name: string): Promise<void> {
    const connection: mysql.Connection = await this.database_.connect(
      this.options_
    );
    return new Promise<void>((resolve, reject) => {
      connection.query(`DROP DATABASE ${name}`, function (error, result) {
        if (error) reject(error);
        else {
          console.log('Database deleted', result);
          connection.end((endError) => {
            if (endError) reject(endError);
            else resolve();
          });
        }
      });
    });
  }

  private database_: Database;
  private options_: Options;
}
