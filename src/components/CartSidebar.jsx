import { useContext } from 'react'
import { AppContext } from '../AppContext'
import '../styles/CartSidebar.css'
import { FaTimes } from 'react-icons/fa'

function CartSidebar() {
  const { 
    showCart, 
    setShowCart, 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    cartTotal, 
    deliveryFee, 
    orderTotal,
    user,
    setShowLoginModal,
    setCurrentPage
  } = useContext(AppContext)

  const handleCheckout = () => {
    if (!user) {
      setShowLoginModal(true)
    } else {
      setCurrentPage('checkout')
      setShowCart(false)
    }
  }

  return (
    <div className={`cart-sidebar ${showCart ? 'open' : ''}`}>
      <div className="cart-header">
        <h3 className="cart-title">Your Order</h3>
        <button className="cart-close" onClick={() => setShowCart(false)}>
          <FaTimes />
        </button>
      </div>
      
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty</p>
        ) : (
          cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img 
                src={item.image || "https://via.placeholder.com/80"} 
                alt={item.name} 
                className="cart-item-image" 
              />
              <div className="cart-item-info">
                <h4 className="cart-item-name">{item.name}</h4>
                <div className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</div>
                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button 
                      className="quantity-btn" 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button 
                      className="quantity-btn" 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button 
                    className="remove-item-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <div className="cart-total">
            <span>Subtotal:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="cart-total">
            <span>Delivery Fee:</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="cart-total">
            <span>Total:</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  )
}

export default CartSidebar