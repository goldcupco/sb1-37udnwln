from sqlalchemy import Column, String, Date, Enum, ARRAY
from app.database import Base
import enum

class MembershipStatus(str, enum.Enum):
    regular = "regular"
    premium = "premium"
    vip = "vip"

class Customer(Base):
    __tablename__ = "customers"

    id = Column(String, primary_key=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone = Column(String, nullable=False)
    street = Column(String, nullable=False)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    zip_code = Column(String, nullable=False)
    country = Column(String, nullable=False)
    driver_license_number = Column(String, unique=True, nullable=False)
    driver_license_state = Column(String, nullable=False)
    driver_license_expiry = Column(Date, nullable=False)
    date_of_birth = Column(Date, nullable=False)
    membership_status = Column(Enum(MembershipStatus), nullable=False)
    registration_date = Column(Date, nullable=False)
    rental_history = Column(ARRAY(String))