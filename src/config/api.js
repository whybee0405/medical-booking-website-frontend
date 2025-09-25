// API Configuration for Frontend
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000',
  FRONTEND_URL: import.meta.env.VITE_APP_URL || 'http://localhost:5173'
}

export const ENDPOINTS = {
  NAVIGATION_CONFIG: '/api/navigation/config',
  AUTH_LOGIN: '/api/auth/login',
  AUTH_REGISTER: '/api/auth/register',
  AVAILABILITY: '/api/availability'
}

// Navigation API service
export class NavigationAPI {
  static async getConfig() {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${ENDPOINTS.NAVIGATION_CONFIG}`)
      if (!response.ok) {
        throw new Error('Failed to fetch navigation config')
      }
      return await response.json()
    } catch (error) {
      console.error('Navigation API Error:', error)
      return this.getFallbackConfig()
    }
  }

  static getFallbackConfig() {
    return {
      frontend_url: API_CONFIG.FRONTEND_URL,
      backend_url: API_CONFIG.BACKEND_URL,
      navigation: {
        main: [
          { label: 'Home', path: '/', type: 'frontend', section: 'home' },
          { label: 'Services', path: '/#services', type: 'frontend', section: 'services' },
          { label: 'About', path: '/#about', type: 'frontend', section: 'about' },
          { label: 'Contact', path: '/#contact', type: 'frontend', section: 'contact' }
        ],
        auth: [
          { label: 'Login', path: '/login', type: 'backend' },
          { label: 'Register', path: '/register', type: 'backend' }
        ],
        cta: [
          { label: 'Patient Portal', path: '/dashboard', type: 'backend', style: 'primary' }
        ]
      },
      organization: {
        name: 'CloudIA Medical',
        logo: null
      }
    }
  }
}