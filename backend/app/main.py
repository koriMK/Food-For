from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.database import engine
from app.models import models
from app.routes import auth, restaurants, orders

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Food-For API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(restaurants.router)
app.include_router(orders.router)

@app.get("/")
def root():
    return {"message": "Food-For API is running!"}