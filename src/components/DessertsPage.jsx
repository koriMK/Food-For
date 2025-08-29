import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../AppContext';
import '../styles/DessertsPage.css';
import { FaStar, FaIceCream, FaArrowLeft } from 'react-icons/fa';

function DessertsPage() {
  const { addToCart, setCurrentPage } = useContext(AppContext);
  const [desserts, setDesserts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDesserts();
  }, []);

  const fetchDesserts = async () => {
    try {
      // Using mock dessert data since there's no free dessert API
      const mockDesserts = [
        { id: 1, name: 'Chocolate Cake', price: 6.99, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300' },
        { id: 2, name: 'Cheesecake', price: 7.99, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=300' },
        { id: 3, name: 'Ice Cream Sundae', price: 5.99, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300' },
        { id: 4, name: 'Tiramisu', price: 8.99, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300' },
        { id: 5, name: 'Apple Pie', price: 5.49, image: 'https://images.unsplash.com/photo-1535920527002-b35e96722da9?w=300' },
        { id: 6, name: 'Brownies', price: 4.99, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300' },
        { id: 7, name: 'Macarons', price: 12.99, image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=300' },
        { id: 8, name: 'Crème Brûlée', price: 9.99, image: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=300' },
      ];

      const formattedDesserts = mockDesserts.map(item => ({
        id: item.id,
        name: item.name,
        description: `Delicious ${item.name.toLowerCase()} - perfect sweet treat`,
        price: item.price,
        image: item.image,
        category: 'Desserts',
        rating: (Math.random() * 1.5 + 3.5).toFixed(1)
      }));

      setDesserts(formattedDesserts);
    } catch (error) {
      console.error('Error loading desserts:', error);
      setDesserts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (dessert) => {
    addToCart(dessert, 'desserts');
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading desserts...</div>
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
      <div className="desserts-header">
        <FaIceCream className="desserts-icon" />
        <h2>Sweet Desserts</h2>
        <p>Indulge in our delicious dessert collection</p>
      </div>
      
      <div className="desserts-grid">
        {desserts.map(dessert => (
          <div key={dessert.id} className="dessert-card">
            <img src={dessert.image} alt={dessert.name} className="dessert-image" />
            <div className="dessert-info">
              <h3 className="dessert-name">{dessert.name}</h3>
              <p className="dessert-description">{dessert.description}</p>
              <div className="dessert-meta">
                <div className="dessert-rating">
                  <FaStar className="star-icon" />
                  {dessert.rating}
                </div>
              </div>
              <div className="dessert-footer">
                <span className="dessert-price">${dessert.price.toFixed(2)}</span>
                <button 
                  className="add-dessert-btn"
                  onClick={() => handleAddToCart(dessert)}
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

export default DessertsPage;