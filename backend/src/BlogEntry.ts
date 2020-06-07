import DatabaseConnection from './DatabaseConnection';
import Model from './Model';

export interface BlogValues {
  id?: number;
  title: string;
  content: string;
}

export default class extends Model<BlogValues> {
  constructor(databaseConnection: DatabaseConnection, db: string) {
    super(databaseConnection, db, 'BlogEntry');
  }
}
