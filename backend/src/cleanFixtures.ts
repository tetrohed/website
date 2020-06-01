import DatabaseConnection, { Options } from './DatabaseConnection';
import DatabaseAdmin from './DatabaseAdmin';
import { databaseConfig } from './Environment';

const cleanFixtures = async (options: Options): Promise<void> => {
  const databaseConnection = new DatabaseConnection(options);
  const dbAdmin = new DatabaseAdmin(databaseConnection);

  await dbAdmin.dropDb('test_db');
};

cleanFixtures(databaseConfig)
  .then(() => {
    console.log('cleaned fixtures');
    return '';
  })
  .catch((error) => {
    console.error('could not clean fixtures because of: ', error);
  });
