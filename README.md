# Food-For - Complete Food Delivery App

A full-stack food delivery application with React frontend and Python FastAPI backend.

## Features

- 🍔 Browse restaurants and menus
- 🛒 Shopping cart functionality
- 👤 User authentication (register/login)
- 📍 Restaurant locations with map view
- 📱 Responsive design
- 🎯 Category-based food browsing
- 📦 Order management and history
- 💳 Checkout with payment options

## Tech Stack

### Frontend
- React 19 with Vite
- React Context for state management
- React Icons
- React Leaflet for maps
- CSS3 with custom styling

### Backend
- Python FastAPI
- SQLAlchemy ORM
- SQLite database
- JWT authentication
- Pydantic for data validation
- Uvicorn ASGI server

## Quick Start

### Prerequisites
- Node.js 16+
- Python 3.8+

### 1. Clone and Setup
```bash
git clone <your-repo>
cd Food-For
```

### 2. Start Backend
```bash
./run-backend.sh
```
Backend will run on http://localhost:8000

### 3. Start Frontend
```bash
npm install
npm run dev
```
Frontend will run on http://localhost:5173

## Project Structure

```
Food-For/
├── backend/                 # Python FastAPI backend
│   ├── app/
│   │   ├── models/         # Database models & schemas
│   │   ├── routes/         # API endpoints
│   │   ├── database/       # Database configuration
│   │   └── main.py         # FastAPI app
│   ├── venv/               # Python virtual environment
│   └── requirements.txt    # Python dependencies
├── src/                    # React frontend
│   ├── components/         # React components
│   ├── services/          # API service layer
│   └── styles/            # CSS files
└── public/                # Static assets
```

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Restaurants
- `GET /restaurants/` - Get all restaurants
- `GET /restaurants/{id}` - Get restaurant details
- `GET /restaurants/{id}/menu` - Get restaurant menu

### Orders
- `POST /orders/` - Create new order
- `GET /orders/` - Get user orders

## Database Schema

- **Users**: User accounts and authentication
- **Restaurants**: Restaurant information and locations
- **MenuItems**: Food items with prices and descriptions
- **Orders**: Order records with status tracking
- **OrderItems**: Individual items within orders

## Development

### Backend Development
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

### Frontend Development
```bash
npm run dev
```

### Database Reset
```bash
cd backend
rm food_for.db
python seed_data.py
```

## Features in Detail

### 🏠 Home Page
- Hero section with search
- Category browsing
- Popular restaurants display

### 🍕 Restaurant Pages
- Menu browsing by category
- Add items to cart
- Restaurant details and ratings

### 🛒 Shopping Cart
- Add/remove items
- Quantity management
- Real-time total calculation
- Cross-restaurant cart validation

### 👤 User Authentication
- Registration with email/password
- JWT-based authentication
- Protected routes for orders

### 📦 Order Management
- Checkout with address and payment
- Order history tracking
- Order status updates

### 📍 Map Integration
- Restaurant locations on map
- User location detection
- Interactive restaurant markers

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## License

MIT License - see LICENSE file for details