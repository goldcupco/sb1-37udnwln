from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.crud import car as car_crud
from app.schemas.car import Car, CarCreate
from app.database import get_db

router = APIRouter()

@router.get("/cars/", response_model=List[Car])
def read_cars(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    cars = car_crud.get_cars(db, skip=skip, limit=limit)
    return cars

@router.get("/cars/{car_id}", response_model=Car)
def read_car(car_id: str, db: Session = Depends(get_db)):
    db_car = car_crud.get_car(db, car_id)
    if db_car is None:
        raise HTTPException(status_code=404, detail="Car not found")
    return db_car

@router.post("/cars/", response_model=Car)
def create_car(car: CarCreate, db: Session = Depends(get_db)):
    return car_crud.create_car(db=db, car=car)

@router.put("/cars/{car_id}", response_model=Car)
def update_car(car_id: str, car: CarCreate, db: Session = Depends(get_db)):
    db_car = car_crud.update_car(db, car_id, car)
    if db_car is None:
        raise HTTPException(status_code=404, detail="Car not found")
    return db_car

@router.delete("/cars/{car_id}")
def delete_car(car_id: str, db: Session = Depends(get_db)):
    success = car_crud.delete_car(db, car_id)
    if not success:
        raise HTTPException(status_code=404, detail="Car not found")
    return {"message": "Car deleted successfully"}