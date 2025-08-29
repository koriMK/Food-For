from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class UserCreate(BaseModel):
    email: str
    name: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class User(BaseModel):
    id: int
    email: str
    name: str
    
    class Config:
        orm_mode = True

class MenuItem(BaseModel):
    id: int
    name: str
    description: str
    price: float
    category: str
    image: str
    restaurant_id: int
    
    class Config:
        orm_mode = True

class Restaurant(BaseModel):
    id: int
    name: str
    image: str
    rating: float
    delivery_time: str
    min_order: str
    latitude: float
    longitude: float
    menu_items: List[MenuItem] = []
    
    class Config:
        orm_mode = True

class OrderItemCreate(BaseModel):
    menu_item_id: int
    quantity: int
    price: float

class OrderCreate(BaseModel):
    restaurant_id: int
    address: str
    payment_method: str
    items: List[OrderItemCreate]

class OrderItem(BaseModel):
    id: int
    menu_item_id: int
    quantity: int
    price: float
    menu_item: MenuItem
    
    class Config:
        orm_mode = True

class Order(BaseModel):
    id: int
    restaurant_id: int
    total: float
    address: str
    payment_method: str
    status: str
    created_at: datetime
    restaurant: Restaurant
    order_items: List[OrderItem] = []
    
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: User