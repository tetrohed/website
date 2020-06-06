import DatabaseConnection from './DatabaseConnection';

export interface Model<T> {
  insert(values: T): Promise<void>;

  getAll(): Promise<T[]>;
}

export default class<T> implements Model<T> {
  constructor(
    databaseConnection: DatabaseConnection,
    db: string,
    name: string
  ) {
    this.databaseConnection_ = databaseConnection;
    this.name_ = name;
    this.db_ = db;
  }

  async insert(values: T): Promise<void> {
    return this.databaseConnection_.raw(
      `INSERT INTO ${this.name_} (${Object.keys(
        values
      )}) VALUES (${Object.values(values).map((v) => `'${v}'`)})`,
      this.db_
    );
  }

  getAll(): Promise<T[]> {
    return this.databaseConnection_.raw(
      `SELECT * from ${this.name_}`,
      this.db_
    );
  }

  private databaseConnection_: DatabaseConnection;

  private readonly name_: string;

  private readonly db_: string;
}
