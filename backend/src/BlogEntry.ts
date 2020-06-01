import DatabaseConnection from './DatabaseConnection';

export interface BlogValues {
  id?: number;
  title: string;
  content: string;
}

export interface BlogEntry {
  insert(values: BlogValues): Promise<void>;

  getAll(): Promise<BlogValues[]>;
}

export default class implements BlogEntry {
  constructor(
    databaseConnection: DatabaseConnection,
    name: string,
    db: string
  ) {
    this.name_ = name;
    this.databaseConnection_ = databaseConnection;
    this.db_ = db;
  }

  async insert(values: BlogValues): Promise<void> {
    return this.databaseConnection_.raw(
      `INSERT INTO ${this.name_} (${Object.keys(
        values
      )}) VALUES (${Object.values(values).map((v) => `'${v}'`)})`,
      this.db_
    );
  }

  getAll(): Promise<BlogValues[]> {
    return this.databaseConnection_.raw(
      `SELECT * from ${this.name_}`,
      this.db_
    );
  }

  private databaseConnection_: DatabaseConnection;

  private readonly name_: string;

  private readonly db_: string;
}
