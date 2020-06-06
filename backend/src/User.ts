import DatabaseConnection from './DatabaseConnection';
import Model from './Model';

export interface UserValues {
  id?: number;
  userName: string;
  password: string;
}

export default class extends Model<UserValues> {
  constructor(databaseConnection: DatabaseConnection, db: string) {
    super(databaseConnection, db, 'User');
  }
}
