import express from 'express';
import BlogEntryService from './src/BlogEntryService';
import BlogEntry from './src/BlogEntry';
import DatabaseConnection from './src/DatabaseConnection';
import { version } from './package.json';
import { databaseConfig } from './src/Environment';

const app = express();

const databaseConnection = new DatabaseConnection(databaseConfig);
const blogEntry = new BlogEntry(
  databaseConnection,
  'BlogEntry',
  databaseConfig.dbName
);
const blogEntryService = new BlogEntryService(blogEntry);

app.get('/blog/', (req, res) => blogEntryService.get(req, res));
app.get('/', (req, res) => {
  res.status(200).send(`running with version: ${version}`);
});

app.listen(process.env.SERVICE_PORT, () => {
  console.log('listening on ', process.env.SERVICE_PORT);
});
