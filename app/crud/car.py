from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.car import Car
from app.schemas.car import CarCreate
import uuid

def get_car(db: Session, car_id: str) -> Optional[Car]:
    return db.query(Car).filter(Car.id == car_id).first()

def get_cars(db: Session, skip: int = 0, limit: int = 100) -> List[Car]:
    return db.query(Car).offset(skip).limit(limit).all()

def create_car(db: Session, car: CarCreate) -> Car:
    db_car = Car(id=str(uuid.uuid4()), **car.dict())
    db.add(db_car)
    db.commit()
    db.refresh(db_car)
    return db_car

def update_car(db: Session, car_id: str, car: CarCreate) -> Optional[Car]:
    db_car = get_car(db, car_id)
    if db_car:
        for key, value in car.dict().items():
            setattr(db_car, key, value)
        db.commit()
        db.refresh(db_car)
    return db_car

def delete_car(db: Session, car_id: str) -> bool:
    db_car = get_car(db, car_id)
    if db_car:
        db.delete(db_car)
        db.commit()
        return True
    return False