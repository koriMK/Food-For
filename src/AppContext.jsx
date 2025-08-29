import { createContext, useState, useEffect } from 'react'
import apiService from '../services/api'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [user, setUser] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  const categories = [
    { id: 1, name: 'Fast Food', icon: 'category-food' },
    { id: 2, name: 'Drinks', icon: 'category-drink' },
    { id: 3, name: 'Groceries', icon: 'category-grocery' },
    { id: 4, name: 'Desserts', icon: 'category-dessert' },
    { id: 5, name: 'Asian', icon: 'category-food' },
    { id: 6, name: 'Italian', icon: 'category-food' },
  ]

  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: 'Burger Palace',
      image: '/images/burger.jpg',
      rating: 4.5,
      deliveryTime: '20-30 min',
      minOrder: '$10',
      categories: [1],
      coordinates: [40.7589, -73.9851],
    },
    {
      id: 2,
      name: 'Pizza Heaven',
      image: '/images/Pizza.jpg',
      rating: 4.2,
      deliveryTime: '25-35 min',
      minOrder: '$15',
      categories: [1, 6],
      coordinates: [40.7505, -73.9934],
    },
    {
      id: 3,
      name: 'Sushi World',
      image: '/images/sushi.jpg',
      rating: 4.7,
      deliveryTime: '30-40 min',
      minOrder: '$20',
      categories: [5],
      coordinates: [40.7614, -73.9776],
    },
    {
      id: 4,
      name: 'Sweet Dreams',
      image: '/images/dessert.jpg',
      rating: 4.3,
      deliveryTime: '15-25 min',
      minOrder: '$8',
      categories: [4],
      coordinates: [40.7282, -74.0776],
    },
  ])

  const [menuItems, setMenuItems] = useState({})

  const staticMenuItems = {
    1: [
      {
        id: 101,
        name: 'Classic Burger',
        description: 'Beef patty with lettuce, tomato, and special sauce',
        price: 8.99,
        category: 'Mains',
        image: '/images/burger.jpg',
      },
      {
        id: 102,
        name: 'Cheeseburger',
        description: 'Classic burger with American cheese',
        price: 9.99,
        category: 'Mains',
        image: '/images/burger.jpg',
      },
      {
        id: 103,
        name: 'Bacon Burger',
        description: 'Classic burger with crispy bacon',
        price: 10.99,
        category: 'Mains',
        image: '/images/burger.jpg',
      },
      {
        id: 104,
        name: 'French Fries',
        description: 'Crispy golden fries with sea salt',
        price: 3.99,
        category: 'Sides',
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300',
      },
      {
        id: 105,
        name: 'Chocolate Shake',
        description: 'Creamy chocolate milkshake',
        price: 4.99,
        category: 'Drinks',
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300',
      },
    ],
    2: [
      {
        id: 201,
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce and mozzarella',
        price: 12.99,
        category: 'Mains',
        image: '/images/Pizza.jpg',
      },
      {
        id: 202,
        name: 'Pepperoni Pizza',
        description: 'Margherita pizza with pepperoni',
        price: 14.99,
        category: 'Mains',
        image: '/images/Pizza.jpg',
      },
      {
        id: 203,
        name: 'Garlic Bread',
        description: 'Toasted bread with garlic butter',
        price: 5.99,
        category: 'Sides',
        image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=300',
      },
      {
        id: 204,
        name: 'Tiramisu',
        description: 'Classic Italian dessert',
        price: 6.99,
        category: 'Desserts',
        image: '/images/dessert.jpg',
      },
    ],
    3: [
      {
        id: 301,
        name: 'California Roll',
        description: 'Crab, avocado and cucumber',
        price: 8.99,
        category: 'Mains',
        image: '/images/sushi.jpg',
      },
      {
        id: 302,
        name: 'Spicy Tuna Roll',
        description: 'Tuna with spicy mayo',
        price: 9.99,
        category: 'Mains',
        image: '/images/sushi.jpg',
      },
      {
        id: 303,
        name: 'Miso Soup',
        description: 'Traditional Japanese soup',
        price: 3.99,
        category: 'Sides',
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300',
      },
      {
        id: 304,
        name: 'Green Tea Ice Cream',
        description: 'Refreshing green tea flavor',
        price: 5.99,
        category: 'Desserts',
        image: '/images/dessert.jpg',
      },
    ],
    4: [
      {
        id: 401,
        name: 'Chocolate Cake',
        description: 'Rich chocolate cake with fudge icing',
        price: 6.99,
        category: 'Desserts',
        image: '/images/dessert.jpg',
      },
      {
        id: 402,
        name: 'Cheesecake',
        description: 'New York style cheesecake',
        price: 7.99,
        category: 'Desserts',
        image: '/images/dessert.jpg',
      },
      {
        id: 403,
        name: 'Ice Cream Sundae',
        description: 'Vanilla ice cream with toppings',
        price: 5.99,
        category: 'Desserts',
        image: '/images/dessert.jpg',
      },
      {
        id: 404,
        name: 'Coffee',
        description: 'Freshly brewed coffee',
        price: 2.99,
        category: 'Drinks',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300',
      },
    ],
  }
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  const deliveryFee = cartTotal > 0 ? 2.99 : 0
  const orderTotal = cartTotal + deliveryFee

  const addToCart = (item, restaurantId) => {
    if (cartItems.length > 0 && cartItems[0].restaurantId !== restaurantId) {
      if (window.confirm('Your cart contains items from another restaurant. Would you like to clear your cart and add this item?')) {
        setCartItems([{ ...item, restaurantId, quantity: 1 }])
      }
      return
    }

    const existingItem = cartItems.find(cartItem => cartItem.id === item.id)
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ))
    } else {
      setCartItems([...cartItems, { ...item, restaurantId, quantity: 1 }])
    }
    setShowCart(true)
  }
  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId))
  }
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId)
      return
    }
    setCartItems(cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ))
  }
  const handleLogin = async (email, password) => {
    try {
      setLoading(true)
      const response = await apiService.login(email, password)
      setUser(response.user)
      setShowLoginModal(false)
      await loadUserOrders()
    } catch (error) {
      console.error('Login failed:', error)
      alert('Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }
  const handleLogout = () => {
    apiService.logout()
    setUser(null)
    setOrders([])
  }
  const handleCheckout = async (address, paymentMethod) => {
    try {
      setLoading(true)
      const orderData = {
        restaurant_id: cartItems[0]?.restaurantId,
        address,
        payment_method: paymentMethod,
        items: cartItems.map(item => ({
          menu_item_id: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      }
      
      await apiService.createOrder(orderData)
      await loadUserOrders()
      setCartItems([])
      setShowCart(false)
      setCurrentPage('dashboard')
    } catch (error) {
      console.error('Checkout failed:', error)
      alert('Order failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const loadRestaurants = async () => {
    try {
      const data = await apiService.getRestaurants()
      setRestaurants(data.map(r => ({
        ...r,
        coordinates: [r.latitude, r.longitude],
        minOrder: r.min_order,
        deliveryTime: r.delivery_time
      })))
    } catch (error) {
      console.error('Failed to load restaurants:', error)
    }
  }

  const loadMenuItems = async () => {
    try {
      const menuData = {}
      for (const restaurant of restaurants) {
        const menu = await apiService.getRestaurantMenu(restaurant.id)
        menuData[restaurant.id] = menu
      }
      setMenuItems(menuData)
    } catch (error) {
      console.error('Failed to load menu items:', error)
      setMenuItems(staticMenuItems)
    }
  }

  const loadUserOrders = async () => {
    if (!user) return
    try {
      const userOrders = await apiService.getUserOrders()
      setOrders(userOrders.map(order => ({
        ...order,
        date: order.created_at,
        items: order.order_items
      })))
    } catch (error) {
      console.error('Failed to load orders:', error)
    }
  }

  const handleRegister = async (email, name, password) => {
    try {
      setLoading(true)
      const response = await apiService.register(email, name, password)
      setUser(response.user)
      setShowLoginModal(false)
    } catch (error) {
      console.error('Registration failed:', error)
      alert('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRestaurants()
  }, [])

  useEffect(() => {
    if (restaurants.length > 0) {
      loadMenuItems()
    }
  }, [restaurants])

  useEffect(() => {
    loadUserOrders()
  }, [user])

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedRestaurant,
        setSelectedRestaurant,
        cartItems,
        setCartItems,
        user,
        setUser,
        showLoginModal,
        setShowLoginModal,
        showCart,
        setShowCart,
        orders,
        setOrders,
        categories,
        restaurants,
        menuItems: Object.keys(menuItems).length > 0 ? menuItems : staticMenuItems,
        cartTotal,
        deliveryFee,
        orderTotal,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        handleLogin,
        handleLogout,
        handleCheckout,
        handleRegister,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}