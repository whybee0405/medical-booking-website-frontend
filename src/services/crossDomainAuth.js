// Cross-Domain Authentication Helper
// This service handles authentication across different localhost ports in development

class CrossDomainAuth {
  constructor() {
    this.backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    this.storageKey = 'medical_booking_auth_token'
  }

  // Login method - post credentials to backend and handle session
  async login(email, password) {
    console.log('CrossDomainAuth: Attempting login to:', `${this.backendUrl}/cross-domain/login`)
    try {
      const response = await fetch(`${this.backendUrl}/cross-domain/login`, {
        method: 'POST',
        credentials: 'include', // Important for cookies
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (data.success) {
        // Store token if provided
        if (data.token) {
          this.setToken(data.token)
        }
        
        return {
          success: true,
          authenticated: true,
          user: data.user,
          message: data.message
        }
      } else {
        return {
          success: false,
          authenticated: false,
          user: null,
          message: data.message || 'Login failed'
        }
      }
    } catch (error) {
      console.error('Cross-domain login error:', error)
      return {
        success: false,
        authenticated: false,
        user: null,
        message: 'Login failed due to network error'
      }
    }
  }

  // Store authentication token
  setToken(token) {
    localStorage.setItem(this.storageKey, token)
  }

  // Get stored token
  getToken() {
    return localStorage.getItem(this.storageKey)
  }

  // Clear authentication
  clearAuth() {
    localStorage.removeItem(this.storageKey)
    localStorage.removeItem('medical_booking_return_url')
  }

  // Logout and redirect
  async logout() {
    const token = this.getToken()
    
    try {
      await fetch(`${this.backendUrl}/cross-domain/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': token ? `Bearer ${token}` : ''
        }
      })
    } catch (error) {
      console.warn('Logout API call failed:', error)
    }

    this.clearAuth()
    return { success: true }
  }
}

export default CrossDomainAuth