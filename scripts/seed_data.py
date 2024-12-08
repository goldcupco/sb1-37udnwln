import os
from supabase import create_client
from dotenv import load_dotenv
from datetime import date, datetime, timedelta
import json
import uuid

def generate_uuid():
    return str(uuid.uuid4())

def main():
    # Load environment variables
    load_dotenv()
    
    # Initialize Supabase client
    supabase = create_client(
        os.getenv("SUPABASE_URL"),
        os.getenv("SUPABASE_ANON_KEY")
    )

    try:
        # Create a sample location
        location_data = {
            "id": generate_uuid(),
            "name": "Downtown Branch",
            "type": "city",
            "street": "123 Main Street",
            "city": "New York",
            "state": "NY",
            "zip_code": "10001",
            "country": "USA",
            "latitude": 40.7128,
            "longitude": -74.0060,
            "phone": "212-555-0123",
            "email": "downtown@carental.com",
            "operating_hours": json.dumps({
                "monday": {"open": "09:00", "close": "18:00"},
                "tuesday": {"open": "09:00", "close": "18:00"},
                "wednesday": {"open": "09:00", "close": "18:00"},
                "thursday": {"open": "09:00", "close": "18:00"},
                "friday": {"open": "09:00", "close": "18:00"},
                "saturday": {"open": "10:00", "close": "16:00"},
                "sunday": {"open": "10:00", "close": "16:00"}
            })
        }
        
        print("Creating location...")
        location_result = supabase.table('locations').insert(location_data).execute()
        print("Location created successfully")

        # Create a sample car
        car_data = {
            "id": generate_uuid(),
            "make": "Toyota",
            "model": "Camry",
            "year": 2023,
            "license_plate": "ABC123NY",
            "vin": "1HGCM82633A123456",
            "color": "Silver",
            "mileage": 15000,
            "transmission": "automatic",
            "fuel_type": "gasoline",
            "category": "economy",
            "daily_rate": 50.00,
            "status": "available",
            "features": ["Bluetooth", "Backup Camera", "Cruise Control"],
            "last_maintenance_date": date.today().isoformat(),
            "location_id": location_data["id"]
        }

        print("Creating car...")
        car_result = supabase.table('cars').insert(car_data).execute()
        print("Car created successfully")

        # Create a sample customer
        customer_data = {
            "id": generate_uuid(),
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "phone": "212-555-0124",
            "street": "456 Park Avenue",
            "city": "New York",
            "state": "NY",
            "zip_code": "10002",
            "country": "USA",
            "driver_license_number": "NY123456789",
            "driver_license_state": "NY",
            "driver_license_expiry": (date.today() + timedelta(days=365)).isoformat(),
            "date_of_birth": "1990-01-01",
            "membership_status": "regular",
            "registration_date": date.today().isoformat()
        }

        print("Creating customer...")
        customer_result = supabase.table('customers').insert(customer_data).execute()
        print("Customer created successfully")

        # Create a sample rental
        rental_data = {
            "id": generate_uuid(),
            "car_id": car_data["id"],
            "customer_id": customer_data["id"],
            "start_date": datetime.now().isoformat(),
            "end_date": (datetime.now() + timedelta(days=3)).isoformat(),
            "pickup_location_id": location_data["id"],
            "return_location_id": location_data["id"],
            "status": "scheduled",
            "base_rate": 50.00,
            "insurance_rate": 10.00,
            "total_amount": 180.00,
            "payment_status": "pending",
            "mileage_start": 15000,
            "fuel_level_start": 1.0,
            "insurance_type": "basic"
        }

        print("Creating rental...")
        rental_result = supabase.table('rentals').insert(rental_data).execute()
        print("Rental created successfully")

        print("Sample data created successfully!")

    except Exception as e:
        print(f"Error creating sample data: {str(e)}")

if __name__ == "__main__":
    main()