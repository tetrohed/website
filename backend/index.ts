import express from 'express';
import BlogEntryService from './src/BlogEntryService';
import BlogEntry from './src/BlogEntry';
import DatabaseConnection from './src/DatabaseConnection';
import { config } from 'dotenv';
import { version } from './package.json';

config();

if (
  !process.env.DATABASE_ADDRESS ||
  !process.env.DATABASE_USER ||
  !process.env.DATABASE_PASSWORD ||
  !process.env.DATABASE_PORT ||
  !process.env.SERVICE_PORT
) {
  console.error('missing envs', process.env);
  process.exit(1);
}

const databaseConfig = {
  host: process.env.DATABASE_ADDRESS,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: parseInt(process.env.DATABASE_PORT as string, 10),
};

const app = express();

const databaseConnection = new DatabaseConnection(databaseConfig);
const blogEntry = new BlogEntry(
  databaseConnection,
  'BlogEntry',
  'armin_blog_db'
);
const blogEntryService = new BlogEntryService(blogEntry);

app.get('/blog/', blogEntryService.get);
app.get('/', (req, res) => {
  res.status(200).send(`running with version: ${version}`);
});

app.listen(process.env.SERVICE_PORT, () => {
  console.log('listening on ', process.env.SERVICE_PORT);
});
