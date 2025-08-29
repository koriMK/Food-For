from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database.database import get_db
from app.models import models, schemas
from app.auth import get_current_user

router = APIRouter(prefix="/orders", tags=["orders"])

@router.post("/", response_model=schemas.Order)
def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    total = sum(item.price * item.quantity for item in order.items) + 2.99  # Add delivery fee
    
    db_order = models.Order(
        user_id=current_user.id,
        restaurant_id=order.restaurant_id,
        total=total,
        address=order.address,
        payment_method=order.payment_method
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    
    for item in order.items:
        db_order_item = models.OrderItem(
            order_id=db_order.id,
            menu_item_id=item.menu_item_id,
            quantity=item.quantity,
            price=item.price
        )
        db.add(db_order_item)
    
    db.commit()
    return db.query(models.Order).filter(models.Order.id == db_order.id).first()

@router.get("/", response_model=List[schemas.Order])
def get_user_orders(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return db.query(models.Order).filter(models.Order.user_id == current_user.id).all()