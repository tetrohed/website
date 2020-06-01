import DatabaseConnection, { Options } from './DatabaseConnection';
import DatabaseAdmin from './DatabaseAdmin';
import BlogEntry from './BlogEntry';
import { databaseConfig } from './Environment';

export default class {
  constructor(options: Options) {
    this.databaseConnection_ = new DatabaseConnection(options);
    this.dbAdmin_ = new DatabaseAdmin(this.databaseConnection_);
  }

  public async clean(): Promise<void> {
    await this.dbAdmin_.dropDb('test_db');
  }

  public async setup(): Promise<void> {
    await this.dbAdmin_.addDb('test_db');
    await this.dbAdmin_.addTable('test_db', 'BlogEntry', [
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
      'BlogEntry',
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

  private readonly databaseConnection_: DatabaseConnection;

  private dbAdmin_: DatabaseAdmin;
}
