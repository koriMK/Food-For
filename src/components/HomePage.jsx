import { useContext, useState } from 'react';
import { AppContext } from '../AppContext';
import '../styles/HomePage.css';
import { 
  FaStar, 
  FaClock,
  FaUtensils,        
  FaGlassMartiniAlt, 
  FaShoppingBasket,  
  FaIceCream        
} from 'react-icons/fa';

function HomePage() {
  const { categories, restaurants, setSelectedRestaurant, setCurrentPage, menuItems } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      const element = document.getElementById('restaurants-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const matchingRestaurant = restaurants.find(restaurant => {
      const restaurantMatches = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
      const menuMatches = menuItems[restaurant.id]?.some(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return restaurantMatches || menuMatches;
    });

    if (matchingRestaurant) {
      setSelectedRestaurant(matchingRestaurant);
      setCurrentPage('restaurant');
    } else {
      const element = document.getElementById('restaurants-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Food delivered to your door</h1>
          <p>Order from your favorite restaurants and get it delivered fast</p>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="What are you craving for?" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </section>
      
      <div className="container">
      </div>
      
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Categories</h2>
          <div className="categories">
            {categories.map(category => (
              <div 
                key={category.id} 
                className="category-card"
                onClick={() => {
                  if (category.name === 'Drinks') {
                    setCurrentPage('drinks');
                  } else if (category.name === 'Fast Food') {
                    setCurrentPage('fastfood');
                  } else if (category.name === 'Groceries') {
                    setCurrentPage('groceries');
                  } else if (category.name === 'Desserts') {
                    setCurrentPage('desserts');
                  } else if (category.name === 'Asian') {
                    setCurrentPage('asian');
                  } else if (category.name === 'Italian') {
                    setCurrentPage('italian');
                  }
                }}
              >
                <div className="category-icon">
                  {category.icon === 'category-food' && <FaUtensils />}
                  {category.icon === 'category-drink' && <FaGlassMartiniAlt />}
                  {category.icon === 'category-grocery' && <FaShoppingBasket />}
                  {category.icon === 'category-dessert' && <FaIceCream />}
                </div>
                <div className="category-name">{category.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <div className="container">
        
        <h2 id="restaurants-section" className="section-title">Popular Delicacies</h2>
        <div className="restaurants">
          {restaurants.map(restaurant => (
            <div 
              key={restaurant.id} 
              className="restaurant-card"
              onClick={() => {
                setSelectedRestaurant(restaurant);
                setCurrentPage('restaurant');
              }}
            >
              <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
              <div className="restaurant-info">
                <h3 className="restaurant-name">{restaurant.name}</h3>
                <div className="restaurant-meta">
                  <span className="restaurant-rating">
                    <FaStar className="star-icon" />
                    {restaurant.rating}
                  </span>
                  <span>
                    <FaClock className="time-icon" />
                    {restaurant.deliveryTime}
                  </span>
                </div>
                <div className="restaurant-min-order">Min. order: {restaurant.minOrder}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;