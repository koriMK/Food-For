import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../AppContext';
import '../styles/ItalianPage.css';
import { FaStar, FaUtensils, FaArrowLeft } from 'react-icons/fa';

function ItalianPage() {
  const { addToCart, setCurrentPage } = useContext(AppContext);
  const [italianFoods, setItalianFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItalianFoods();
  }, []);

  const fetchItalianFoods = async () => {
    try {
      // Using mock Italian food data
      const mockItalianFoods = [
        { id: 1, name: 'Margherita Pizza', price: 16.99, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300' },
        { id: 2, name: 'Spaghetti Carbonara', price: 18.99, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300' },
        { id: 3, name: 'Lasagna', price: 19.99, image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=300' },
        { id: 4, name: 'Fettuccine Alfredo', price: 17.99, image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=300' },
        { id: 5, name: 'Risotto', price: 20.99, image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=300' },
        { id: 6, name: 'Osso Buco', price: 28.99, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300' },
        { id: 7, name: 'Gnocchi', price: 16.99, image: 'https://images.unsplash.com/photo-1587740908075-1e4c5c5afeaf?w=300' },
        { id: 8, name: 'Tiramisu', price: 8.99, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300' },
      ];

      const formattedItalianFoods = mockItalianFoods.map(item => ({
        id: item.id,
        name: item.name,
        description: `Traditional Italian ${item.name.toLowerCase()}`,
        price: item.price,
        image: item.image,
        category: 'Italian',
        rating: (Math.random() * 1.5 + 3.5).toFixed(1)
      }));

      setItalianFoods(formattedItalianFoods);
    } catch (error) {
      console.error('Error loading Italian foods:', error);
      setItalianFoods([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (food) => {
    addToCart(food, 'italian');
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading Italian cuisine...</div>
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
      <div className="italian-header">
        <FaUtensils className="italian-icon" />
        <h2>Italian Cuisine</h2>
        <p>Authentic Italian flavors and traditions</p>
      </div>
      
      <div className="italian-grid">
        {italianFoods.map(food => (
          <div key={food.id} className="italian-card">
            <img src={food.image} alt={food.name} className="italian-image" />
            <div className="italian-info">
              <h3 className="italian-name">{food.name}</h3>
              <p className="italian-description">{food.description}</p>
              <div className="italian-meta">
                <div className="italian-rating">
                  <FaStar className="star-icon" />
                  {food.rating}
                </div>
              </div>
              <div className="italian-footer">
                <span className="italian-price">${food.price.toFixed(2)}</span>
                <button 
                  className="add-italian-btn"
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

export default ItalianPage;