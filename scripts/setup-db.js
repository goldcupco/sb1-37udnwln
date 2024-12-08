import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function setupDatabase() {
  try {
    // Read and execute schema.sql
    const schema = await fetch('database/schema.sql').then(res => res.text());
    const statements = schema.split(';').filter(stmt => stmt.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        await supabase.rpc('exec_sql', { sql: statement });
        console.log('Executed SQL statement successfully');
      }
    }
    
    console.log('Database schema setup completed successfully!');
    return true;
  } catch (error) {
    console.error('Error setting up database:', error);
    return false;
  }
}

setupDatabase();