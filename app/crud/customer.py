from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.customer import Customer
from app.schemas.customer import CustomerCreate
import uuid
from datetime import date

def get_customer(db: Session, customer_id: str) -> Optional[Customer]:
    return db.query(Customer).filter(Customer.id == customer_id).first()

def get_customer_by_email(db: Session, email: str) -> Optional[Customer]:
    return db.query(Customer).filter(Customer.email == email).first()

def get_customers(db: Session, skip: int = 0, limit: int = 100) -> List[Customer]:
    return db.query(Customer).offset(skip).limit(limit).all()

def create_customer(db: Session, customer: CustomerCreate) -> Customer:
    db_customer = Customer(
        id=str(uuid.uuid4()),
        registration_date=date.today(),
        **customer.dict()
    )
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer

def update_customer(db: Session, customer_id: str, customer: CustomerCreate) -> Optional[Customer]:
    db_customer = get_customer(db, customer_id)
    if db_customer:
        for key, value in customer.dict().items():
            setattr(db_customer, key, value)
        db.commit()
        db.refresh(db_customer)
    return db_customer

def delete_customer(db: Session, customer_id: str) -> bool:
    db_customer = get_customer(db, customer_id)
    if db_customer:
        db.delete(db_customer)
        db.commit()
        return True
    return False