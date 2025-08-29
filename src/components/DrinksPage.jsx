import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../AppContext';
import '../styles/DrinksPage.css';
import { FaStar, FaGlassMartiniAlt, FaArrowLeft } from 'react-icons/fa';

function DrinksPage() {
  const { addToCart, setCurrentPage } = useContext(AppContext);
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrinks();
  }, []);

  const fetchDrinks = async () => {
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');
      if (!response.ok) throw new Error('Failed to fetch drinks');
      const data = await response.json();
      
      if (data.drinks) {
        const formattedDrinks = data.drinks.slice(0, 12).map(drink => ({
          id: drink.idDrink,
          name: drink.strDrink,
          description: drink.strInstructions?.substring(0, 100) + '...' || 'Delicious drink',
          price: Math.floor(Math.random() * 15) + 5,
          image: drink.strDrinkThumb,
          category: 'Drinks',
          alcoholic: drink.strAlcoholic
        }));
        setDrinks(formattedDrinks);
      } else {
        setDrinks([]);
      }
    } catch (error) {
      console.error('Error fetching drinks:', error);
      setDrinks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (drink) => {
    addToCart(drink, 'drinks');
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading drinks...</div>
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
      <div className="drinks-header">
        <FaGlassMartiniAlt className="drinks-icon" />
        <h2>Refreshing Drinks</h2>
        <p>Quench your thirst with our selection of beverages</p>
      </div>
      
      <div className="drinks-grid">
        {drinks.map(drink => (
          <div key={drink.id} className="drink-card">
            <img src={drink.image} alt={drink.name} className="drink-image" />
            <div className="drink-info">
              <h3 className="drink-name">{drink.name}</h3>
              <p className="drink-description">{drink.description}</p>
              <div className="drink-meta">
                <span className="drink-type">{drink.alcoholic}</span>
                <div className="drink-rating">
                  <FaStar className="star-icon" />
                  {(Math.random() * 2 + 3).toFixed(1)}
                </div>
              </div>
              <div className="drink-footer">
                <span className="drink-price">${drink.price.toFixed(2)}</span>
                <button 
                  className="add-drink-btn"
                  onClick={() => handleAddToCart(drink)}
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

export default DrinksPage;