import path from 'path';
import {
  fileURLToPath,
} from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const migrations = {
  directory: path.join(__dirname, 'server', 'migrations'),
};

export const development = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite'),
  },
  useNullAsDefault: true,
  migrations,
};

export const test = {
  client: 'sqlite3',
  connection: ':memory:',
  useNullAsDefault: true,
  // debug: true,
  migrations,
};

export const production = {
  client: 'pg',
  connection: {
    connectionString: process.env.DB_URL,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  useNullAsDefault: true,
  migrations,
};
