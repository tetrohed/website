import express from 'express';
import BlogEntryService from './src/BlogEntryService';
import BlogEntry from './src/BlogEntry';
import DatabaseConnection from './src/DatabaseConnection';
import { version } from './package.json';
import { databaseConfig } from './src/Environment';
import UserService from './src/UserService';
import JsonWebToken from './src/JsonWebToken';
import User from './src/User';

if (!process.env.LOGIN_JWT_SECRET) process.exit(1);

const jwtConfig = {
  secret: process.env.LOGIN_JWT_SECRET,
  expiresIn: process.env.LOGIN_JWT_EXPIRATION || '1h',
};
const app = express();

const databaseConnection = new DatabaseConnection(databaseConfig);
const blogEntry = new BlogEntry(databaseConnection, databaseConfig.dbName);
const blogEntryService = new BlogEntryService(blogEntry);
const user = new User(databaseConnection, databaseConfig.dbName);
const userService = new UserService(user, new JsonWebToken(jwtConfig));

app.get('/blog/', (req, res) => blogEntryService.get(req, res));
app.post('/login/', (req, res) => userService.login(req, res));

app.get('/', (req, res) => {
  res.status(200).send(`running with version: ${version}`);
});

app.listen(process.env.SERVICE_PORT, () => {
  console.log('listening on ', process.env.SERVICE_PORT);
});
