const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function initDatabase() {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  try {
    // Read and execute the SQL file using Supabase's SQL editor
    // You'll need to run these statements in the Supabase dashboard SQL editor
    console.log('Please run the SQL statements in database/schema.sql in your Supabase SQL editor');
    console.log('Supabase Dashboard URL: https://supabase.com/dashboard/project/cicooqxfwjpwzapoulwc/sql');
    
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initDatabase();