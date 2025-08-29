from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database.database import get_db
from app.models import models, schemas

router = APIRouter(prefix="/restaurants", tags=["restaurants"])

@router.get("/", response_model=List[schemas.Restaurant])
def get_restaurants(db: Session = Depends(get_db)):
    return db.query(models.Restaurant).all()

@router.get("/{restaurant_id}", response_model=schemas.Restaurant)
def get_restaurant(restaurant_id: int, db: Session = Depends(get_db)):
    return db.query(models.Restaurant).filter(models.Restaurant.id == restaurant_id).first()

@router.get("/{restaurant_id}/menu", response_model=List[schemas.MenuItem])
def get_restaurant_menu(restaurant_id: int, db: Session = Depends(get_db)):
    return db.query(models.MenuItem).filter(models.MenuItem.restaurant_id == restaurant_id).all()