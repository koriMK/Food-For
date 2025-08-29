import { useContext, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { AppContext } from '../AppContext';
import '../styles/MapView.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapView() {
  const { restaurants, setSelectedRestaurant, setCurrentPage } = useContext(AppContext);
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([40.7128, -74.0060]); // Default to NYC

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setMapCenter([latitude, longitude]);
        },
        (error) => {
          console.error('Geolocation error:', error.message);
          // Could add user notification here
        }
      );
    }
  }, []);

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentPage('restaurant');
  };

  return (
    <div className="container">
      <h2 className="section-title">Restaurants Around Me</h2>
      <div className="map-container">
        <MapContainer center={mapCenter} zoom={13} style={{ height: '500px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {userLocation && (
            <Marker position={userLocation}>
              <Popup>You are here!</Popup>
            </Marker>
          )}
          
          {restaurants.filter(restaurant => restaurant.coordinates && Array.isArray(restaurant.coordinates) && restaurant.coordinates.length === 2).map(restaurant => (
            <Marker 
              key={restaurant.id} 
              position={restaurant.coordinates}
            >
              <Popup>
                <div className="map-popup">
                  <h4>{restaurant.name}</h4>
                  <p>Rating: {restaurant.rating} ⭐</p>
                  <p>{restaurant.deliveryTime}</p>
                  <button 
                    className="popup-btn"
                    onClick={() => handleRestaurantClick(restaurant)}
                  >
                    View Menu
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapView;