import os
import sys
from supabase import create_client
from dotenv import load_dotenv

def execute_sql_file(supabase, file_path):
    """Execute SQL file contents in Supabase"""
    try:
        with open(file_path, 'r') as file:
            sql_content = file.read()
            
        # Split the SQL content into individual statements
        statements = sql_content.split(';')
        
        # Execute each statement
        for statement in statements:
            statement = statement.strip()
            if statement:
                try:
                    print(f"Executing SQL statement...")
                    # Use raw SQL execution through RPC
                    data = supabase.rpc('exec_sql', {'sql': statement}).execute()
                    print("Statement executed successfully")
                except Exception as e:
                    print(f"Error executing statement: {str(e)}")
                    # Continue if the error is just that the object already exists
                    if "already exists" not in str(e).lower():
                        raise
        
        return True
        
    except Exception as e:
        print(f"Error processing SQL file: {str(e)}")
        return False

def main():
    # Load environment variables
    load_dotenv()
    
    # Get Supabase credentials
    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_ANON_KEY")
    
    if not supabase_url or not supabase_key:
        print("Error: SUPABASE_URL and SUPABASE_ANON_KEY must be set in .env file")
        sys.exit(1)
    
    try:
        # Initialize Supabase client
        supabase = create_client(supabase_url, supabase_key)
        
        # Execute schema.sql
        schema_path = os.path.join(os.path.dirname(__file__), '..', 'database', 'schema.sql')
        print("Setting up database schema...")
        if execute_sql_file(supabase, schema_path):
            print("Database schema setup completed successfully!")
        else:
            print("Failed to set up database schema")
            sys.exit(1)
            
    except Exception as e:
        print(f"Error setting up database: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()