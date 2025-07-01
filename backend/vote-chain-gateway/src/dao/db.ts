import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'vote_chain_db',
  password: 'admin',
  port: 5432,  // porta padrão do PostgreSQL
});

export default pool;
