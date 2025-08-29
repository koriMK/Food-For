const API_BASE_URL = 'http://localhost:8000'

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token')
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, config)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Auth
  async login(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    this.token = response.access_token
    localStorage.setItem('token', this.token)
    return response
  }

  async register(email, name, password) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, name, password }),
    })
    this.token = response.access_token
    localStorage.setItem('token', this.token)
    return response
  }

  logout() {
    this.token = null
    localStorage.removeItem('token')
  }

  // Restaurants
  async getRestaurants() {
    return await this.request('/restaurants/')
  }

  async getRestaurant(id) {
    return await this.request(`/restaurants/${id}`)
  }

  async getRestaurantMenu(id) {
    return await this.request(`/restaurants/${id}/menu`)
  }

  // Orders
  async createOrder(orderData) {
    return await this.request('/orders/', {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
  }

  async getUserOrders() {
    return await this.request('/orders/')
  }
}

export default new ApiService()