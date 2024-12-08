from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.crud import customer as customer_crud
from app.schemas.customer import Customer, CustomerCreate
from app.database import get_db

router = APIRouter()

@router.get("/customers/", response_model=List[Customer])
def read_customers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    customers = customer_crud.get_customers(db, skip=skip, limit=limit)
    return customers

@router.get("/customers/{customer_id}", response_model=Customer)
def read_customer(customer_id: str, db: Session = Depends(get_db)):
    db_customer = customer_crud.get_customer(db, customer_id)
    if db_customer is None:
        raise HTTPException(status_code=404, detail="Customer not found")
    return db_customer

@router.post("/customers/", response_model=Customer)
def create_customer(customer: CustomerCreate, db: Session = Depends(get_db)):
    db_customer = customer_crud.get_customer_by_email(db, email=customer.email)
    if db_customer:
        raise HTTPException(status_code=400, detail="Email already registered")
    return customer_crud.create_customer(db=db, customer=customer)

@router.put("/customers/{customer_id}", response_model=Customer)
def update_customer(customer_id: str, customer: CustomerCreate, db: Session = Depends(get_db)):
    db_customer = customer_crud.update_customer(db, customer_id, customer)
    if db_customer is None:
        raise HTTPException(status_code=404, detail="Customer not found")
    return db_customer

@router.delete("/customers/{customer_id}")
def delete_customer(customer_id: str, db: Session = Depends(get_db)):
    success = customer_crud.delete_customer(db, customer_id)
    if not success:
        raise HTTPException(status_code=404, detail="Customer not found")
    return {"message": "Customer deleted successfully"}