import pytest
from app.schemas.car import CarCreate
from datetime import date

def test_create_car(client):
    car_data = {
        "make": "Toyota",
        "model": "Camry",
        "year": 2023,
        "license_plate": "TEST123",
        "vin": "1HGCM82633A999999",
        "color": "Black",
        "mileage": 0.0,
        "transmission": "automatic",
        "fuel_type": "gasoline",
        "category": "economy",
        "daily_rate": 50.0,
        "status": "available",
        "features": ["GPS", "Bluetooth"],
        "last_maintenance_date": str(date.today()),
        "location": "Downtown"
    }
    
    response = client.post("/cars/", json=car_data)
    assert response.status_code == 200
    data = response.json()
    assert data["make"] == car_data["make"]
    assert data["model"] == car_data["model"]
    return data

def test_read_car(client):
    # First create a car
    car = test_create_car(client)
    
    # Then retrieve it
    response = client.get(f"/cars/{car['id']}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == car["id"]
    assert data["make"] == car["make"]

def test_read_cars(client):
    response = client.get("/cars/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)

def test_update_car(client):
    # First create a car
    car = test_create_car(client)
    
    # Update data
    update_data = {
        "make": "Honda",
        "model": "Accord",
        "year": 2023,
        "license_plate": "TEST124",
        "vin": "1HGCM82633A999998",
        "color": "Silver",
        "mileage": 100.0,
        "transmission": "automatic",
        "fuel_type": "gasoline",
        "category": "economy",
        "daily_rate": 55.0,
        "status": "available",
        "features": ["GPS", "Bluetooth", "Backup Camera"],
        "last_maintenance_date": str(date.today()),
        "location": "Downtown"
    }
    
    response = client.put(f"/cars/{car['id']}", json=update_data)
    assert response.status_code == 200
    data = response.json()
    assert data["make"] == update_data["make"]
    assert data["model"] == update_data["model"]

def test_delete_car(client):
    # First create a car
    car = test_create_car(client)
    
    # Then delete it
    response = client.delete(f"/cars/{car['id']}")
    assert response.status_code == 200
    
    # Verify it's deleted
    response = client.get(f"/cars/{car['id']}")
    assert response.status_code == 404