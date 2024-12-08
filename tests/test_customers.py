import pytest
from datetime import date, timedelta

def test_create_customer(client):
    customer_data = {
        "first_name": "John",
        "last_name": "Test",
        "email": "john.test@example.com",
        "phone": "555-0100",
        "street": "123 Test St",
        "city": "Test City",
        "state": "TS",
        "zip_code": "12345",
        "country": "Test Country",
        "driver_license_number": "TST123456",
        "driver_license_state": "TS",
        "driver_license_expiry": str(date.today() + timedelta(days=365)),
        "date_of_birth": "1990-01-01",
        "membership_status": "regular",
        "rental_history": []
    }
    
    response = client.post("/customers/", json=customer_data)
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == customer_data["email"]
    assert data["first_name"] == customer_data["first_name"]
    return data

def test_read_customer(client):
    # First create a customer
    customer = test_create_customer(client)
    
    # Then retrieve it
    response = client.get(f"/customers/{customer['id']}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == customer["id"]
    assert data["email"] == customer["email"]

def test_read_customers(client):
    response = client.get("/customers/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)

def test_update_customer(client):
    # First create a customer
    customer = test_create_customer(client)
    
    # Update data
    update_data = {
        "first_name": "Jane",
        "last_name": "Test",
        "email": "jane.test@example.com",
        "phone": "555-0101",
        "street": "124 Test St",
        "city": "Test City",
        "state": "TS",
        "zip_code": "12345",
        "country": "Test Country",
        "driver_license_number": "TST123457",
        "driver_license_state": "TS",
        "driver_license_expiry": str(date.today() + timedelta(days=365)),
        "date_of_birth": "1990-01-01",
        "membership_status": "premium",
        "rental_history": []
    }
    
    response = client.put(f"/customers/{customer['id']}", json=update_data)
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == update_data["email"]
    assert data["first_name"] == update_data["first_name"]

def test_delete_customer(client):
    # First create a customer
    customer = test_create_customer(client)
    
    # Then delete it
    response = client.delete(f"/customers/{customer['id']}")
    assert response.status_code == 200
    
    # Verify it's deleted
    response = client.get(f"/customers/{customer['id']}")
    assert response.status_code == 404

def test_duplicate_email(client):
    # Create first customer
    customer_data = {
        "first_name": "John",
        "last_name": "Test",
        "email": "duplicate@example.com",
        "phone": "555-0100",
        "street": "123 Test St",
        "city": "Test City",
        "state": "TS",
        "zip_code": "12345",
        "country": "Test Country",
        "driver_license_number": "TST123456",
        "driver_license_state": "TS",
        "driver_license_expiry": str(date.today() + timedelta(days=365)),
        "date_of_birth": "1990-01-01",
        "membership_status": "regular",
        "rental_history": []
    }
    
    response = client.post("/customers/", json=customer_data)
    assert response.status_code == 200
    
    # Try to create second customer with same email
    response = client.post("/customers/", json=customer_data)
    assert response.status_code == 400  # Should fail with duplicate email