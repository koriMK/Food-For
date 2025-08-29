import { useContext } from 'react'
import { AppContext } from '../AppContext'
import '../styles/DashboardPage.css'

function DashboardPage() {
  const { user, orders, handleLogout, setCurrentPage } = useContext(AppContext)
  return (
    <div className="container" style={{ padding: '20px 0' }}>
      <h2 className="section-title">My Account</h2>
      
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div style={{ backgroundColor: 'var(--white)', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
            <h3 style={{ marginBottom: '15px' }}>Profile Information</h3>
            <p><strong>Name:</strong> {user?.name || 'Guest'}</p>
            <p><strong>Email:</strong> {user?.email || 'Not provided'}</p>
            <button 
              onClick={handleLogout}
              style={{ 
                marginTop: '15px',
                padding: '8px 15px',
                backgroundColor: 'var(--error-color)',
                color: 'var(--white)',
                border: 'none',
                borderRadius: '4px'
              }}
            >
              Log Out
            </button>
          </div>
          
          <div style={{ backgroundColor: 'var(--white)', padding: '20px', borderRadius: '10px' }}>
            <h3 style={{ marginBottom: '15px' }}>Saved Addresses</h3>
            <p>No saved addresses</p>
            <button 
              style={{ 
                marginTop: '15px',
                padding: '8px 15px',
                backgroundColor: 'var(--primary-color)',
                color: 'var(--white)',
                border: 'none',
                borderRadius: '4px'
              }}
            >
              Add New Address
            </button>
          </div>
        </div>
        
        <div style={{ flex: 2, minWidth: '300px' }}>
          <h3 style={{ marginBottom: '15px' }}>Order History</h3>
          
          {orders.length === 0 ? (
            <div style={{ backgroundColor: 'var(--white)', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
              <p style={{ marginBottom: '15px' }}>You haven't placed any orders yet</p>
              <button 
                onClick={() => setCurrentPage('home')}
                style={{ 
                  padding: '10px 20px',
                  backgroundColor: 'var(--primary-color)',
                  color: 'var(--white)',
                  border: 'none',
                  borderRadius: '4px'
                }}
              >
                Order Now
              </button>
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} style={{ 
                backgroundColor: 'var(--white)', 
                padding: '20px', 
                borderRadius: '10px',
                marginBottom: '15px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <h4>{order.restaurant?.name || 'Unknown Restaurant'}</h4>
                  <span style={{ color: 'var(--primary-color)', fontWeight: '500' }}>${order.total?.toFixed(2) || '0.00'}</span>
                </div>
                <p style={{ color: '#666', marginBottom: '10px' }}>
                  {new Date(order.date).toLocaleString()} • {order.items.length} items
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ 
                    padding: '5px 10px',
                    backgroundColor: order.status === 'delivered' ? 'var(--success-color)' : 'var(--secondary-color)',
                    color: 'var(--white)',
                    borderRadius: '4px',
                    fontSize: '0.9rem'
                  }}>
                    {order.status}
                  </span>
                  <button 
                    style={{ 
                      padding: '5px 10px',
                      border: '1px solid var(--primary-color)',
                      color: 'var(--primary-color)',
                      borderRadius: '4px',
                      backgroundColor: 'transparent'
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage