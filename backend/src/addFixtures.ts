import { databaseConfig } from './Environment';
import Fixture from './Fixture';

new Fixture(databaseConfig)
  .setup()
  .then(() => {
    console.log('setup fixtures');
    return '';
  })
  .catch((error) => {
    console.error('could not setup fixtures because of: ', error);
  });
