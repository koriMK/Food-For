import { useState, useContext } from 'react';
import { AppContext } from '../AppContext';
import '../styles/RestaurantPage.css';
import { FaStar, FaClock, FaMapMarkerAlt, FaArrowLeft } from 'react-icons/fa';

function RestaurantPage() {
  const { 
    selectedRestaurant, 
    menuItems, 
    addToCart, 
    setCurrentPage 
  } = useContext(AppContext);
  
  const [activeCategory, setActiveCategory] = useState('All');
  
  if (!selectedRestaurant) {
    return (
      <div className="container">
        <p>No restaurant selected. Please go back and select a restaurant.</p>
      </div>
    );
  }

  const restaurantMenuItems = menuItems[selectedRestaurant.id] || [];
  const categories = ['All', ...new Set(restaurantMenuItems.map(item => item.category))];
  
  const filteredItems = activeCategory === 'All' 
    ? restaurantMenuItems 
    : restaurantMenuItems.filter(item => item.category === activeCategory);
  
  return (
    <div className="container">
      <button 
        onClick={() => setCurrentPage('home')} 
        className="back-btn"
        style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', fontSize: '1rem' }}
      >
        <FaArrowLeft /> Back to Home
      </button>
      <div className="restaurant-header">
        <img 
          src={selectedRestaurant.image} 
          alt={selectedRestaurant.name} 
          className="restaurant-header-image" 
        />
        <div className="restaurant-header-info">
          <h2>{selectedRestaurant.name}</h2>
          <div className="restaurant-header-meta">
            <span>
              <FaStar />
              {selectedRestaurant.rating}
            </span>
            <span>
              <FaClock />
              {selectedRestaurant.deliveryTime}
            </span>
            <span>
              <FaMapMarkerAlt />
              1.2 miles
            </span>
          </div>
          <p>{selectedRestaurant.minOrder} minimum • Free delivery</p>
        </div>
      </div>
      
      <div className="menu-categories">
        {categories.map(category => (
          <button
            key={category}
            className={`menu-category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="menu-items">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <div key={item.id} className="menu-item">
              <div className="menu-item-info">
                <h3 className="menu-item-name">{item.name}</h3>
                <p className="menu-item-description">{item.description}</p>
                <div className="menu-item-price">${item.price.toFixed(2)}</div>
              </div>
              <div className="menu-item-actions">
                <button 
                  className="add-to-cart-btn"
                  onClick={() => addToCart(item, selectedRestaurant.id)}
                >
                  Add
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No menu items found for this category.</p>
        )}
      </div>
    </div>
  );
}

export default RestaurantPage;