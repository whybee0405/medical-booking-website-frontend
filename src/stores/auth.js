// Pinia Auth Store for Frontend Application
import { defineStore } from 'pinia'
import authService from '@/services/auth.js'
import crossDomainAuth from '@/services/crossDomainAuth.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: authService.getUser(),
    isAuthenticated: authService.isLoggedIn(),
    loading: false,
    error: null,
    initialized: false
  }),

  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
    getUserRole: (state) => state.user?.role || 'patient',
    isLoading: (state) => state.loading,
    hasError: (state) => !!state.error,
    getError: (state) => state.error
  },

  actions: {
    // Set up sync with auth service
    setupAuthServiceSync() {
      authService.addAuthListener(({ isAuthenticated, user }) => {
        this.user = user
        this.isAuthenticated = isAuthenticated
      })
    },
    // Initialize authentication state
    async initialize() {
      if (this.initialized) return
      
      // Set up sync with auth service
      this.setupAuthServiceSync()
      
      // Get immediate cached state for instant UI
      this.user = authService.getUser()
      this.isAuthenticated = authService.isLoggedIn()
      
      this.loading = true
      this.error = null

      try {
        // Do priority authentication check
        await authService.initialize()
        
        // Update with verified state
        this.user = authService.getUser()
        this.isAuthenticated = authService.isLoggedIn()
        
        this.initialized = true
      } catch (error) {
        console.error('Auth initialization failed:', error)
        this.error = 'Failed to initialize authentication'
        this.user = null
        this.isAuthenticated = false
      } finally {
        this.loading = false
      }
    },

    // Login user with email and password
    async login(email, password, remember = false) {
      console.log('AuthStore: Starting login process...')
      this.loading = true
      this.error = null

      try {
        console.log('AuthStore: Calling authService.login...')
        // Use the auth service's login method which handles localStorage
        const result = await authService.login(email, password)
        
        if (result.success) {
          this.user = result.user
          this.isAuthenticated = true
          this.error = null
          return result
        } else {
          throw new Error(result.message || 'Login failed')
        }
      } catch (error) {
        this.error = error.message || 'Login failed'
        this.user = null
        this.isAuthenticated = false
        throw error
      } finally {
        this.loading = false
      }
    },

    // Logout user
    async logout() {
      this.loading = true
      this.error = null

      try {
        await authService.logout(true) // true = user initiated
        
        this.user = null
        this.isAuthenticated = false
        this.error = null
      } catch (error) {
        console.error('Logout failed:', error)
        // Clear state even if logout API call fails
        this.user = null
        this.isAuthenticated = false
      } finally {
        this.loading = false
      }
    },

    // Check authentication status
    async checkAuth() {
      this.loading = true
      
      try {
        const isAuthenticated = await authService.checkAuth()
        if (isAuthenticated) {
          this.user = authService.getUser()
          this.isAuthenticated = true
        } else {
          this.user = null
          this.isAuthenticated = false
        }
        return isAuthenticated
      } catch (error) {
        console.error('Auth check failed:', error)
        this.user = null
        this.isAuthenticated = false
        return false
      } finally {
        this.loading = false
      }
    },

    // Update user data
    updateUser(userData) {
      if (this.isAuthenticated) {
        this.user = { ...this.user, ...userData }
        authService.user = this.user
        authService.notifyListeners()
      }
    },

    // Clear error state
    clearError() {
      this.error = null
    },

    // Set error state
    setError(message) {
      this.error = message
    }
  }
})