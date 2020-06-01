import DatabaseConnection, { Options } from './DatabaseConnection';
import DatabaseAdmin from './DatabaseAdmin';
import { databaseConfig } from './Environment';
import BlogEntry from './BlogEntry';

const addFixtures = async (options: Options): Promise<void> => {
  const databaseConnection = new DatabaseConnection(options);
  const dbAdmin = new DatabaseAdmin(databaseConnection);

  await dbAdmin.addDb('test_db');
  await dbAdmin.addTable('test_db', 'BlogEntry', [
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
    databaseConnection,
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
};

addFixtures(databaseConfig)
  .then(() => {
    console.log('added fixtures');
    return '';
  })
  .catch((error) => {
    console.error('could not add fixtures because of: ', error);
  });
