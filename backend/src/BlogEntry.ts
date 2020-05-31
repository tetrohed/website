import DatabaseConnection from './DatabaseConnection';

export interface BlogValues {
  id?: number;
  title: string;
  content: string;
}

export default class BlogEntry {
  constructor(databaseConnection: DatabaseConnection, name: string) {
    this.name_ = name;
    this.databaseConnection_ = databaseConnection;
  }

  public async insert(values: BlogValues, db: string): Promise<void> {
    return this.databaseConnection_.raw(
      `INSERT INTO ${this.name_} (${Object.keys(
        values
      )}) VALUES (${Object.values(values).map((v) => `'${v}'`)})`,
      db
    );
  }

  public getAll(db: string): Promise<BlogValues> {
    return this.databaseConnection_.raw(`SELECT * from ${this.name_}`, db);
  }

  private databaseConnection_: DatabaseConnection;

  private readonly name_: string;
}
