import pg from 'pg';

const { Pool } = pg;

// TODO: dotenv this! ok for local dev
const pool = new Pool({
  user: 'postgres',
  database: 'todo',
  password: 'password',
  host: 'localhost',
  port: 5432,
});

export default pool;
