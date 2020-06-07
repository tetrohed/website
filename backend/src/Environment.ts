import { config } from 'dotenv';
config();

if (
  !process.env.DATABASE_ADDRESS ||
  !process.env.DATABASE_USER ||
  !process.env.DATABASE_PASSWORD ||
  !process.env.DATABASE_PORT ||
  !process.env.SERVICE_PORT ||
  !process.env.DATABASE_NAME
) {
  console.error('missing envs', process.env);
  process.exit(1);
}

const databaseConfig = {
  host: process.env.DATABASE_ADDRESS,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: parseInt(process.env.DATABASE_PORT as string, 10),
  dbName: process.env.DATABASE_NAME,
};

export { databaseConfig };
