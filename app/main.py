from fastapi import FastAPI
from app.api import cars, customers
from app.database import engine
from app import models

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Car Rental API")

# Include routers
app.include_router(cars.router, tags=["cars"])
app.include_router(customers.router, tags=["customers"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Car Rental API"}