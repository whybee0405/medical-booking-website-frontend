// Authentication Service for Frontend
// Handles user authentication state and API communication with backend

import CrossDomainAuth from './crossDomainAuth.js'

class AuthService {
  constructor() {
    this.baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    this.user = null
    this.isAuthenticated = false
    this.listeners = []
    this.crossDomainAuth = new CrossDomainAuth()
    this.storageKeys = {
      user: 'medical_booking_user',
      isAuthenticated: 'medical_booking_auth',
      lastCheck: 'medical_booking_last_check'
    }
    // Restore state from localStorage immediately
    this.restoreFromStorage()
    
    // Set up activity-based auth checking
    this.setupActivityBasedChecking()
  }

  // Set up checking auth on user activity
  setupActivityBasedChecking() {
    if (typeof window === 'undefined') return // Server-side rendering check
    
    let activityTimer
    const checkAuthOnActivity = () => {
      // Only check if we think we're authenticated and it's been a while
      if (this.isAuthenticated) {
        const lastCheck = localStorage.getItem(this.storageKeys.lastCheck)
        const now = Date.now()
        const lastCheckTime = lastCheck ? parseInt(lastCheck) : 0
        const oneMinute = 60 * 1000
        
        if (now - lastCheckTime > oneMinute) {
          this.verifyAuthInBackground()
        }
      }
    }
    
    // Debounced activity checker
    const debouncedCheck = () => {
      clearTimeout(activityTimer)
      activityTimer = setTimeout(checkAuthOnActivity, 1000) // Check 1 second after activity stops
    }
    
    // Listen for user activity
    window.addEventListener('click', debouncedCheck, { passive: true })
    window.addEventListener('keydown', debouncedCheck, { passive: true })
    window.addEventListener('scroll', debouncedCheck, { passive: true })
    window.addEventListener('mousemove', debouncedCheck, { passive: true })
    
    // Also check when tab becomes visible
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.isAuthenticated) {
        checkAuthOnActivity()
      }
    })
    
    // Set up periodic heartbeat for long sessions (every 5 minutes)
    setInterval(() => {
      if (this.isAuthenticated) {
        this.verifyAuthInBackground()
      }
    }, 5 * 60 * 1000) // 5 minutes
  }

  // Restore authentication state from localStorage
  restoreFromStorage() {
    try {
      const storedAuth = localStorage.getItem(this.storageKeys.isAuthenticated)
      const storedUser = localStorage.getItem(this.storageKeys.user)
      const lastCheck = localStorage.getItem(this.storageKeys.lastCheck)
      
      if (storedAuth === 'true' && storedUser) {
        this.isAuthenticated = true
        this.user = JSON.parse(storedUser)
        
        // Check if we should verify with server (older than 2 minutes)
        const now = Date.now()
        const lastCheckTime = lastCheck ? parseInt(lastCheck) : 0
        const twoMinutes = 2 * 60 * 1000
        
        if (now - lastCheckTime > twoMinutes) {
          // Verify in background without changing UI state immediately
          this.verifyAuthInBackground()
        }
      }
    } catch (error) {
      console.warn('Failed to restore auth state from localStorage:', error)
      this.clearStorage()
    }
  }

  // Save authentication state to localStorage
  saveToStorage() {
    try {
      localStorage.setItem(this.storageKeys.isAuthenticated, this.isAuthenticated.toString())
      localStorage.setItem(this.storageKeys.user, JSON.stringify(this.user))
      localStorage.setItem(this.storageKeys.lastCheck, Date.now().toString())
    } catch (error) {
      console.warn('Failed to save auth state to localStorage:', error)
    }
  }

  // Clear localStorage
  clearStorage() {
    localStorage.removeItem(this.storageKeys.isAuthenticated)
    localStorage.removeItem(this.storageKeys.user)
    localStorage.removeItem(this.storageKeys.lastCheck)
  }

  // Verify authentication with server in background
  async verifyAuthInBackground() {
    try {
      const response = await fetch(`${this.baseURL}/api/user-status`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.authenticated) {
          // Update user data if it changed
          if (JSON.stringify(this.user) !== JSON.stringify(data.user)) {
            this.user = data.user
            this.saveToStorage()
            this.notifyListeners()
          }
          // Update last check time
          localStorage.setItem(this.storageKeys.lastCheck, Date.now().toString())
        } else {
          // Server says not authenticated - user was logged out elsewhere
          console.log('User logged out on backend, clearing frontend state')
          this.handleBackendLogout()
        }
      } else {
        // If we can't verify, check more frequently
        console.warn('Background auth verification failed, will retry sooner')
        localStorage.setItem(this.storageKeys.lastCheck, (Date.now() - 90000).toString()) // Retry in 30 seconds
      }
    } catch (error) {
      console.warn('Background auth verification error:', error)
      // On network error, retry sooner but don't clear auth
      localStorage.setItem(this.storageKeys.lastCheck, (Date.now() - 90000).toString())
    }
  }

  // Handle when backend says user is logged out
  handleBackendLogout() {
    // Clear auth state without calling backend (since backend already logged out)
    this.logout(false) // false = not user initiated
    
    // Show a brief, non-intrusive message
    this.showSessionExpiredMessage()
  }

  // Show a subtle session expired message
  showSessionExpiredMessage() {
    // Create a subtle toast notification
    const toast = document.createElement('div')
    toast.className = 'session-expired-toast'
    toast.innerHTML = `
      <div style="
        position: fixed;
        top: 80px;
        right: 20px;
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(8px);
        color: #f1f5f9;
        padding: 12px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        border: 1px solid rgba(59, 130, 246, 0.3);
        z-index: 9999;
        font-size: 14px;
        font-weight: 500;
        max-width: 320px;
        transition: all 0.3s ease;
        animation: slideInRight 0.3s ease;
      ">
        <div style="display: flex; align-items: center;">
          <svg style="width: 16px; height: 16px; margin-right: 8px; color: #60a5fa;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          <span>Session updated</span>
        </div>
      </div>
    `
    
    // Add animation styles
    const style = document.createElement('style')
    style.textContent = `
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `
    document.head.appendChild(style)
    
    document.body.appendChild(toast)
    
    // Remove after 2.5 seconds with fade out
    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease'
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast)
        }
        if (style.parentNode) {
          style.parentNode.removeChild(style)
        }
      }, 300)
    }, 2500)
  }

  // Check if user is authenticated using direct API call only
  async checkAuth() {
    try {
      // Direct API call to verify authentication
      const response = await fetch(`${this.baseURL}/api/user-status`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.authenticated) {
          this.user = data.user
          this.isAuthenticated = true
          this.saveToStorage()
          this.notifyListeners()
          return true
        }
      }

      // No authentication found
      this.user = null
      this.isAuthenticated = false
      this.clearStorage()
      this.notifyListeners()
      return false

    } catch (error) {
      console.warn('Auth check failed:', error)
      this.user = null
      this.isAuthenticated = false
      this.clearStorage()
      this.notifyListeners()
      return false
    }
  }

  // Get current user data
  getUser() {
    return this.user
  }

  // Check if user is authenticated
  isLoggedIn() {
    return this.isAuthenticated
  }

  // Logout user
  async logout(isUserInitiated = true) {
    // If user initiated logout, call the backend
    if (isUserInitiated) {
      try {
        await this.crossDomainAuth.logout()
      } catch (error) {
        console.warn('Logout API call failed:', error)
        // Continue with local logout even if API fails
      }
    }
    
    // Clear local state and storage
    this.user = null
    this.isAuthenticated = false
    this.clearStorage()
    this.notifyListeners()
  }

  // Add authentication state listener
  addAuthListener(callback) {
    this.listeners.push(callback)
  }

  // Remove authentication state listener
  removeAuthListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback)
  }

  // Notify all listeners of auth state changes
  notifyListeners() {
    this.listeners.forEach(callback => {
      callback({
        isAuthenticated: this.isAuthenticated,
        user: this.user
      })
    })
  }

  // Login method (delegate to cross-domain service but update our state)
  async login(email, password) {
    const result = await this.crossDomainAuth.login(email, password)
    
    if (result.success && result.authenticated) {
      // Update our state immediately
      this.user = result.user
      this.isAuthenticated = true
      this.saveToStorage()
      this.notifyListeners()
    }
    
    return result
  }
  async getCsrfToken() {
    try {
      await fetch(`${this.baseURL}/sanctum/csrf-cookie`, {
        credentials: 'include'
      })
    } catch (error) {
      console.warn('CSRF token fetch failed:', error)
    }
  }

  // Initialize authentication (call on app startup)
  async initialize() {
    // If we have cached auth state, notify listeners immediately
    if (this.isAuthenticated) {
      this.notifyListeners()
    }

    // Always do a priority check on homepage/app startup - this ensures auth is current
    await this.doPriorityAuthCheck()
    
    return this.isAuthenticated
  }

  // Priority authentication check - always runs on app startup
  async doPriorityAuthCheck() {
    try {
      console.log('Doing priority auth check...')
      
      // Get CSRF token first
      await this.getCsrfToken()
      
      // Check authentication status immediately
      const response = await fetch(`${this.baseURL}/api/user-status`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.authenticated) {
          console.log('Priority check: User is authenticated')
          this.user = data.user
          this.isAuthenticated = true
          this.saveToStorage()
        } else {
          console.log('Priority check: User is not authenticated')
          this.user = null
          this.isAuthenticated = false
          this.clearStorage()
        }
      } else {
        console.warn('Priority auth check failed:', response.status)
        // If check fails, clear state to be safe
        this.user = null
        this.isAuthenticated = false
        this.clearStorage()
      }
      
      // Update last check time
      localStorage.setItem(this.storageKeys.lastCheck, Date.now().toString())
      
      // Notify listeners of final auth state
      this.notifyListeners()
      
    } catch (error) {
      console.error('Priority auth check error:', error)
      // On error, clear auth state to be safe
      this.user = null
      this.isAuthenticated = false
      this.clearStorage()
      this.notifyListeners()
    }
  }

  // Get user profile navigation items (similar to backend)
  getProfileNavigation() {
    if (!this.isAuthenticated || !this.user) return []

    return [
      {
        label: 'Dashboard',
        path: '/dashboard',
        icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z',
        color: 'blue'
      },
      {
        label: 'My Appointments',
        path: '/booking/appointments', 
        icon: 'M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
        color: 'teal'
      },
      {
        label: 'My Profile',
        path: '/profile',
        icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
        color: 'purple'
      },
      {
        label: 'Medical History',
        path: '/medical-history',
        icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
        color: 'emerald'
      }
    ]
  }
}

// Create singleton instance
const authService = new AuthService()

export default authService