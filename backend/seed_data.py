from sqlalchemy.orm import Session
from app.database.database import SessionLocal, engine
from app.models import models

def seed_data():
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # Check if data already exists
    if db.query(models.Restaurant).first():
        print("Data already exists, skipping seed...")
        return
    
    # Create restaurants
    restaurants = [
        models.Restaurant(
            id=1, name="Burger Palace", image="/images/burger.jpg",
            rating=4.5, delivery_time="20-30 min", min_order="$10",
            latitude=40.7589, longitude=-73.9851
        ),
        models.Restaurant(
            id=2, name="Pizza Heaven", image="/images/Pizza.jpg",
            rating=4.2, delivery_time="25-35 min", min_order="$15",
            latitude=40.7505, longitude=-73.9934
        ),
        models.Restaurant(
            id=3, name="Sushi World", image="/images/sushi.jpg",
            rating=4.7, delivery_time="30-40 min", min_order="$20",
            latitude=40.7614, longitude=-73.9776
        ),
        models.Restaurant(
            id=4, name="Sweet Dreams", image="/images/dessert.jpg",
            rating=4.3, delivery_time="15-25 min", min_order="$8",
            latitude=40.7282, longitude=-74.0776
        )
    ]
    
    for restaurant in restaurants:
        db.add(restaurant)
    
    # Create menu items
    menu_items = [
        # Burger Palace
        models.MenuItem(id=101, name="Classic Burger", description="Beef patty with lettuce, tomato, and special sauce", price=8.99, category="Mains", image="/images/burger.jpg", restaurant_id=1),
        models.MenuItem(id=102, name="Cheeseburger", description="Classic burger with American cheese", price=9.99, category="Mains", image="/images/burger.jpg", restaurant_id=1),
        models.MenuItem(id=103, name="Bacon Burger", description="Classic burger with crispy bacon", price=10.99, category="Mains", image="/images/burger.jpg", restaurant_id=1),
        models.MenuItem(id=104, name="French Fries", description="Crispy golden fries with sea salt", price=3.99, category="Sides", image="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300", restaurant_id=1),
        models.MenuItem(id=105, name="Chocolate Shake", description="Creamy chocolate milkshake", price=4.99, category="Drinks", image="https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300", restaurant_id=1),
        
        # Pizza Heaven
        models.MenuItem(id=201, name="Margherita Pizza", description="Classic pizza with tomato sauce and mozzarella", price=12.99, category="Mains", image="/images/Pizza.jpg", restaurant_id=2),
        models.MenuItem(id=202, name="Pepperoni Pizza", description="Margherita pizza with pepperoni", price=14.99, category="Mains", image="/images/Pizza.jpg", restaurant_id=2),
        models.MenuItem(id=203, name="Garlic Bread", description="Toasted bread with garlic butter", price=5.99, category="Sides", image="https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=300", restaurant_id=2),
        models.MenuItem(id=204, name="Tiramisu", description="Classic Italian dessert", price=6.99, category="Desserts", image="/images/dessert.jpg", restaurant_id=2),
        
        # Sushi World
        models.MenuItem(id=301, name="California Roll", description="Crab, avocado and cucumber", price=8.99, category="Mains", image="/images/sushi.jpg", restaurant_id=3),
        models.MenuItem(id=302, name="Spicy Tuna Roll", description="Tuna with spicy mayo", price=9.99, category="Mains", image="/images/sushi.jpg", restaurant_id=3),
        models.MenuItem(id=303, name="Miso Soup", description="Traditional Japanese soup", price=3.99, category="Sides", image="https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300", restaurant_id=3),
        models.MenuItem(id=304, name="Green Tea Ice Cream", description="Refreshing green tea flavor", price=5.99, category="Desserts", image="/images/dessert.jpg", restaurant_id=3),
        
        # Sweet Dreams
        models.MenuItem(id=401, name="Chocolate Cake", description="Rich chocolate cake with fudge icing", price=6.99, category="Desserts", image="/images/dessert.jpg", restaurant_id=4),
        models.MenuItem(id=402, name="Cheesecake", description="New York style cheesecake", price=7.99, category="Desserts", image="/images/dessert.jpg", restaurant_id=4),
        models.MenuItem(id=403, name="Ice Cream Sundae", description="Vanilla ice cream with toppings", price=5.99, category="Desserts", image="/images/dessert.jpg", restaurant_id=4),
        models.MenuItem(id=404, name="Coffee", description="Freshly brewed coffee", price=2.99, category="Drinks", image="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300", restaurant_id=4),
    ]
    
    for item in menu_items:
        db.add(item)
    
    db.commit()
    print("Database seeded successfully!")

if __name__ == "__main__":
    seed_data()