from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import date
from enum import Enum

class MembershipStatus(str, Enum):
    regular = "regular"
    premium = "premium"
    vip = "vip"

class CustomerBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    street: str
    city: str
    state: str
    zip_code: str
    country: str
    driver_license_number: str
    driver_license_state: str
    driver_license_expiry: date
    date_of_birth: date
    membership_status: MembershipStatus
    rental_history: List[str] = []

class CustomerCreate(CustomerBase):
    pass

class Customer(CustomerBase):
    id: str
    registration_date: date

    class Config:
        orm_mode = True