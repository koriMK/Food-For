import { useContext } from 'react'
import { AppContext } from './AppContext'
import './styles/global.css'
import Header from './components/Header'
import Footer from './components/footer'
import HomePage from './components/HomePage'
import RestaurantPage from './components/RestaurantPage'
import CartSidebar from './components/CartSidebar'
import LoginModal from './components/LoginModal'
import CheckoutPage from './components/CheckoutPage'
import DashboardPage from './components/DashboardPage'
import MapView from './components/MapView'
import DrinksPage from './components/DrinksPage'
import FastFoodPage from './components/FastFoodPage'
import GroceriesPage from './components/GroceriesPage'
import DessertsPage from './components/DessertsPage'
import AsianPage from './components/AsianPage'
import ItalianPage from './components/ItalianPage'

function App() {
  const { currentPage, showLoginModal, showCart } = useContext(AppContext)

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />
      case 'restaurant':
        return <RestaurantPage />
      case 'dashboard':                             
        return <DashboardPage />
      case 'checkout':
        return <CheckoutPage />
      case 'map':
        return <MapView />
      case 'drinks':
        return <DrinksPage />
      case 'fastfood':
        return <FastFoodPage />
      case 'groceries':
        return <GroceriesPage />
      case 'desserts':
        return <DessertsPage />
      case 'asian':
        return <AsianPage />
      case 'italian':
        return <ItalianPage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="app">
      <Header />
      <main>
        {renderPage()}
      </main>
      <Footer />
      
      {showLoginModal && <LoginModal />}
      {showCart && <CartSidebar />}
    </div>
  )
}

export default App