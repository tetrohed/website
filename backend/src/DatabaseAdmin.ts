import DatabaseConnection from './DatabaseConnection';

type OrmType = 'TEXT' | 'INT' | 'CHAR';
type Type = string | number;

export interface Column<O extends OrmType, T extends Type> {
  name: string;
  dataType: O;
  defaultValue?: T;
  size?: number;
  nullability?: 'NOT NULL' | 'UNIQUE' | 'CHECK';
  autoIncrement?: boolean;
  primaryKey?: boolean;
}

export type SqlColumn =
  | Column<'TEXT', string>
  | Column<'INT', number>
  | Column<'CHAR', number>;

export default class DatabaseAdmin {
  constructor(database: DatabaseConnection) {
    this.database_ = database;
  }

  public async addDb(name: string): Promise<void> {
    return this.database_.raw(`CREATE DATABASE ${name}`);
  }

  public async addTable(
    toDb: string,
    name: string,
    columns: SqlColumn[]
  ): Promise<void> {
    const sql =
      `CREATE TABLE IF NOT EXISTS ${name} (` +
      columns.map(
        (c) =>
          `${c.name} ${c.dataType}${c.size ? `(${c.size})` : ''} ${
            c.defaultValue ? c.defaultValue : ''
          } ${c.autoIncrement ? 'AUTO_INCREMENT' : ''} ${
            c.primaryKey ? 'PRIMARY KEY' : ''
          }`
      ) +
      ');';
    return this.database_.raw(sql, toDb);
  }

  public async dropDb(name: string): Promise<void> {
    return this.database_.raw(`DROP DATABASE ${name}`);
  }

  private database_: DatabaseConnection;
}
