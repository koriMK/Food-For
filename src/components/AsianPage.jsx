import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../AppContext';
import '../styles/AsianPage.css';
import { FaStar, FaUtensils, FaArrowLeft } from 'react-icons/fa';

function AsianPage() {
  const { addToCart, setCurrentPage } = useContext(AppContext);
  const [asianFoods, setAsianFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAsianFoods();
  }, []);

  const fetchAsianFoods = async () => {
    try {
      // Using mock Asian food data
      const mockAsianFoods = [
        { id: 1, name: 'Pad Thai', price: 12.99, image: 'https://images.unsplash.com/photo-1559314809-0f31657def5e?w=300', cuisine: 'Thai' },
        { id: 2, name: 'Sushi Platter', price: 24.99, image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300', cuisine: 'Japanese' },
        { id: 3, name: 'Kung Pao Chicken', price: 14.99, image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300', cuisine: 'Chinese' },
        { id: 4, name: 'Bibimbap', price: 13.99, image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=300', cuisine: 'Korean' },
        { id: 5, name: 'Pho', price: 11.99, image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=300', cuisine: 'Vietnamese' },
        { id: 6, name: 'Chicken Teriyaki', price: 15.99, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300', cuisine: 'Japanese' },
        { id: 7, name: 'Fried Rice', price: 9.99, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300', cuisine: 'Chinese' },
        { id: 8, name: 'Tom Yum Soup', price: 8.99, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300', cuisine: 'Thai' },
      ];

      const formattedAsianFoods = mockAsianFoods.map(item => ({
        id: item.id,
        name: item.name,
        description: `Authentic ${item.cuisine} ${item.name.toLowerCase()}`,
        price: item.price,
        image: item.image,
        category: 'Asian',
        cuisine: item.cuisine,
        rating: (Math.random() * 1.5 + 3.5).toFixed(1)
      }));

      setAsianFoods(formattedAsianFoods);
    } catch (error) {
      console.error('Error loading Asian foods:', error);
      setAsianFoods([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (food) => {
    addToCart(food, 'asian');
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading Asian cuisine...</div>
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
      <div className="asian-header">
        <FaUtensils className="asian-icon" />
        <h2>Asian Cuisine</h2>
        <p>Authentic flavors from across Asia</p>
      </div>
      
      <div className="asian-grid">
        {asianFoods.map(food => (
          <div key={food.id} className="asian-card">
            <img src={food.image} alt={food.name} className="asian-image" />
            <div className="asian-info">
              <h3 className="asian-name">{food.name}</h3>
              <p className="asian-description">{food.description}</p>
              <div className="asian-meta">
                <span className="asian-cuisine">{food.cuisine}</span>
                <div className="asian-rating">
                  <FaStar className="star-icon" />
                  {food.rating}
                </div>
              </div>
              <div className="asian-footer">
                <span className="asian-price">${food.price.toFixed(2)}</span>
                <button 
                  className="add-asian-btn"
                  onClick={() => handleAddToCart(food)}
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

export default AsianPage;