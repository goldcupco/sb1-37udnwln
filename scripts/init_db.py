import os
from supabase import create_client, Client
from dotenv import load_dotenv

def init_database():
    # Load environment variables
    load_dotenv()
    
    # Get Supabase credentials
    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_ANON_KEY")
    
    if not supabase_url or not supabase_key:
        raise ValueError("Missing Supabase credentials in environment variables")
    
    # Initialize Supabase client
    supabase: Client = create_client(supabase_url, supabase_key)
    
    try:
        # Read the SQL file
        with open('database/schema.sql', 'r') as file:
            sql_script = file.read()
        
        # Split the SQL script into individual statements
        # This is a simple split - for production you might want a more robust SQL parser
        statements = sql_script.split(';')
        
        # Execute each statement
        for statement in statements:
            statement = statement.strip()
            if statement:  # Skip empty statements
                try:
                    # Execute the SQL statement
                    supabase.db.execute(statement)
                    print(f"Successfully executed statement")
                except Exception as e:
                    print(f"Error executing statement: {e}")
        
        print("Database initialization completed successfully")
        
    except Exception as e:
        print(f"Error initializing database: {e}")

if __name__ == "__main__":
    init_database()