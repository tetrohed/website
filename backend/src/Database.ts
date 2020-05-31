import mysql from 'mysql';

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
}
