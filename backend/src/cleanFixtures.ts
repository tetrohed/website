import { databaseConfig } from './Environment';
import Fixture from './Fixture';

new Fixture(databaseConfig)
  .clean()
  .then(() => {
    console.log('cleaned fixtures');
    return '';
  })
  .catch((error) => {
    console.error('could not clean fixtures because of: ', error);
  });
