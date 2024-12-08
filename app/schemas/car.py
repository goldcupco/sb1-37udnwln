from pydantic import BaseModel
from typing import List, Optional
from datetime import date
from enum import Enum

class TransmissionType(str, Enum):
    automatic = "automatic"
    manual = "manual"

class FuelType(str, Enum):
    gasoline = "gasoline"
    diesel = "diesel"
    electric = "electric"
    hybrid = "hybrid"

class CarCategory(str, Enum):
    economy = "economy"
    compact = "compact"
    luxury = "luxury"
    suv = "suv"
    van = "van"

class CarStatus(str, Enum):
    available = "available"
    rented = "rented"
    maintenance = "maintenance"
    reserved = "reserved"

class CarBase(BaseModel):
    make: str
    model: str
    year: int
    license_plate: str
    vin: str
    color: str
    mileage: float
    transmission: TransmissionType
    fuel_type: FuelType
    category: CarCategory
    daily_rate: float
    status: CarStatus
    features: List[str]
    last_maintenance_date: date
    location: str
    image_url: Optional[str] = None

class CarCreate(CarBase):
    pass

class Car(CarBase):
    id: str

    class Config:
        orm_mode = True