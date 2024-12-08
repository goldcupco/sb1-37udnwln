from sqlalchemy import Column, Integer, String, Float, Date, Enum, ARRAY
from app.database import Base
import enum

class TransmissionType(str, enum.Enum):
    automatic = "automatic"
    manual = "manual"

class FuelType(str, enum.Enum):
    gasoline = "gasoline"
    diesel = "diesel"
    electric = "electric"
    hybrid = "hybrid"

class CarCategory(str, enum.Enum):
    economy = "economy"
    compact = "compact"
    luxury = "luxury"
    suv = "suv"
    van = "van"

class CarStatus(str, enum.Enum):
    available = "available"
    rented = "rented"
    maintenance = "maintenance"
    reserved = "reserved"

class Car(Base):
    __tablename__ = "cars"

    id = Column(String, primary_key=True)
    make = Column(String, nullable=False)
    model = Column(String, nullable=False)
    year = Column(Integer, nullable=False)
    license_plate = Column(String, unique=True, nullable=False)
    vin = Column(String, unique=True, nullable=False)
    color = Column(String, nullable=False)
    mileage = Column(Float, nullable=False)
    transmission = Column(Enum(TransmissionType), nullable=False)
    fuel_type = Column(Enum(FuelType), nullable=False)
    category = Column(Enum(CarCategory), nullable=False)
    daily_rate = Column(Float, nullable=False)
    status = Column(Enum(CarStatus), nullable=False)
    features = Column(ARRAY(String))
    last_maintenance_date = Column(Date)
    location = Column(String, nullable=False)
    image_url = Column(String)