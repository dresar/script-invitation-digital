require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  const res = await pool.query('SELECT * FROM system_settings');
  console.log('system_settings raw:', res.rows[0]);
  
  const res2 = await pool.query('SELECT * FROM invitations');
  console.log('invitations raw:', res2.rows[0]);
  
  process.exit(0);
}

check().catch(console.error);
