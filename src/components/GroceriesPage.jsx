import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../AppContext';
import '../styles/GroceriesPage.css';
import { FaStar, FaShoppingBasket, FaArrowLeft } from 'react-icons/fa';

function GroceriesPage() {
  const { addToCart, setCurrentPage } = useContext(AppContext);
  const [groceries, setGroceries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroceries();
  }, []);

  const fetchGroceries = async () => {
    try {
      // Using a mock grocery data since there's no free grocery API
      const mockGroceries = [
        { id: 1, name: 'Fresh Bananas', category: 'Fruits', price: 2.99, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300' },
        { id: 2, name: 'Organic Apples', category: 'Fruits', price: 4.99, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300' },
        { id: 3, name: 'Fresh Milk', category: 'Dairy', price: 3.49, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300' },
        { id: 4, name: 'Whole Wheat Bread', category: 'Bakery', price: 2.79, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300' },
        { id: 5, name: 'Free Range Eggs', category: 'Dairy', price: 4.29, image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300' },
        { id: 6, name: 'Fresh Spinach', category: 'Vegetables', price: 3.99, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300' },
        { id: 7, name: 'Organic Carrots', category: 'Vegetables', price: 2.49, image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=300' },
        { id: 8, name: 'Greek Yogurt', category: 'Dairy', price: 5.99, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300' },
        { id: 9, name: 'Brown Rice', category: 'Grains', price: 3.79, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300' },
        { id: 10, name: 'Olive Oil', category: 'Pantry', price: 8.99, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300' },
        { id: 11, name: 'Fresh Tomatoes', category: 'Vegetables', price: 3.29, image: 'https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=300' },
        { id: 12, name: 'Chicken Breast', category: 'Meat', price: 12.99, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300' }
      ];

      const formattedGroceries = mockGroceries.map(item => ({
        id: item.id,
        name: item.name,
        description: `Fresh ${item.name.toLowerCase()} - high quality grocery item`,
        price: item.price,
        image: item.image,
        category: 'Groceries',
        type: item.category
      }));

      setGroceries(formattedGroceries);
    } catch (error) {
      console.error('Error loading groceries:', error);
      setGroceries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (grocery) => {
    addToCart(grocery, 'groceries');
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading groceries...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <button 
        onClick={() => setCurrentPage('home')} 
        className="back-btn"
        style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', fontSize: '1rem' }}
      >
        <FaArrowLeft /> Back to Home
      </button>
      <div className="groceries-header">
        <FaShoppingBasket className="groceries-icon" />
        <h2>Fresh Groceries</h2>
        <p>Quality ingredients delivered to your doorstep</p>
      </div>
      
      <div className="groceries-grid">
        {groceries.map(grocery => (
          <div key={grocery.id} className="grocery-card">
            <img src={grocery.image} alt={grocery.name} className="grocery-image" />
            <div className="grocery-info">
              <h3 className="grocery-name">{grocery.name}</h3>
              <p className="grocery-description">{grocery.description}</p>
              <div className="grocery-meta">
                <span className="grocery-type">{grocery.type}</span>
                <div className="grocery-rating">
                  <FaStar className="star-icon" />
                  {(Math.random() * 1.5 + 3.5).toFixed(1)}
                </div>
              </div>
              <div className="grocery-footer">
                <span className="grocery-price">${grocery.price.toFixed(2)}</span>
                <button 
                  className="add-grocery-btn"
                  onClick={() => handleAddToCart(grocery)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroceriesPage;