import DatabaseConnection, { Options } from './DatabaseConnection';
import DatabaseAdmin from './DatabaseAdmin';
import BlogEntry from './BlogEntry';
import { databaseConfig } from './Environment';
import User from './User';

export default class {
  constructor(options: Options) {
    this.databaseConnection_ = new DatabaseConnection(options);
    this.dbAdmin_ = new DatabaseAdmin(this.databaseConnection_);
  }

  public async clean(): Promise<void> {
    await this.dbAdmin_.dropDb('test_db');
  }

  private async setupBlogEntries(): Promise<void> {
    await this.dbAdmin_.addTable(databaseConfig.dbName, 'BlogEntry', [
      {
        name: 'title',
        dataType: 'TEXT' as const,
        size: 255,
      },
      {
        name: 'id',
        dataType: 'INT' as const,
        autoIncrement: true,
        primaryKey: true,
      },
      {
        name: 'content',
        dataType: 'TEXT' as const,
      },
    ]);

    const blogEntry = new BlogEntry(
      this.databaseConnection_,
      databaseConfig.dbName
    );
    const blogEntries = [
      {
        title: 'this is vanilla mysql',
        content: 'and it works',
      },
      {
        title: 'should you use frameworks',
        content: 'depends',
      },
      {
        title: 'should you make everything yourself',
        content: 'if you have time and resources',
      },
    ];

    await Promise.all(blogEntries.map((b) => blogEntry.insert(b)));
  }

  private async setupUsers(): Promise<void> {
    await this.dbAdmin_.addTable(databaseConfig.dbName, 'User', [
      {
        name: 'id',
        dataType: 'INT' as const,
        autoIncrement: true,
        primaryKey: true,
      },
      {
        name: 'userName',
        dataType: 'TEXT' as const,
        size: 255,
      },
      {
        name: 'password',
        dataType: 'CHAR' as const,
        size: 60,
      },
    ]);

    const user = new User(this.databaseConnection_, databaseConfig.dbName);
    const users = [
      {
        userName: 'arminjazi',
        password: 'hashedPassword1',
      },
      {
        userName: 'arashjazi',
        password: 'hashedPassword2',
      },
      {
        userName: 'joe',
        password: 'hashedPassword3',
      },
    ];

    await Promise.all(users.map((u) => user.insert(u)));
  }

  public async setup(): Promise<void> {
    await this.dbAdmin_.addDb(databaseConfig.dbName);

    await this.setupBlogEntries();
    await this.setupUsers();
  }

  private readonly databaseConnection_: DatabaseConnection;

  private dbAdmin_: DatabaseAdmin;
}
