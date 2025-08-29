import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../AppContext';
import '../styles/FastFoodPage.css';
import { FaStar, FaUtensils, FaArrowLeft } from 'react-icons/fa';

function FastFoodPage() {
  const { addToCart, setCurrentPage } = useContext(AppContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken');
      if (!response.ok) throw new Error('Failed to fetch foods');
      const data = await response.json();
      
      if (data.meals) {
        const formattedFoods = data.meals.slice(0, 12).map(meal => ({
          id: meal.idMeal,
          name: meal.strMeal,
          description: meal.strInstructions?.substring(0, 100) + '...' || 'Delicious fast food',
          price: Math.floor(Math.random() * 20) + 8,
          image: meal.strMealThumb,
          category: 'Fast Food',
          cuisine: meal.strArea
        }));
        setFoods(formattedFoods);
      } else {
        setFoods([]);
      }
    } catch (error) {
      console.error('Error fetching foods:', error);
      setFoods([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (food) => {
    addToCart(food, 'fastfood');
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading fast food...</div>
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
      <div className="fastfood-header">
        <FaUtensils className="fastfood-icon" />
        <h2>Fast Food Favorites</h2>
        <p>Quick and delicious meals delivered fast</p>
      </div>
      
      <div className="fastfood-grid">
        {foods.map(food => (
          <div key={food.id} className="food-card">
            <img src={food.image} alt={food.name} className="food-image" />
            <div className="food-info">
              <h3 className="food-name">{food.name}</h3>
              <p className="food-description">{food.description}</p>
              <div className="food-meta">
                <span className="food-cuisine">{food.cuisine}</span>
                <div className="food-rating">
                  <FaStar className="star-icon" />
                  {(Math.random() * 2 + 3).toFixed(1)}
                </div>
              </div>
              <div className="food-footer">
                <span className="food-price">${food.price.toFixed(2)}</span>
                <button 
                  className="add-food-btn"
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

export default FastFoodPage;