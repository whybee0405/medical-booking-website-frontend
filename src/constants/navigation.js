// Navigation Configuration Constants
// This file provides a fallback configuration for navigation items
// when the API is not available or for development purposes

export const NAVIGATION_CONFIG = {
  // Frontend/Backend URLs
  frontend_url: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
  backend_url: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000',
  
  // Navigation sections
  navigation: {
    // Main frontend navigation items
    main: [
      {
        label: 'Home',
        path: '/',
        type: 'frontend',
        section: 'home',
        icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
        enabled: true
      },
      {
        label: 'Services',
        path: '/#services',
        type: 'frontend',
        section: 'services',
        icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
        enabled: true
      },
      {
        label: 'About',
        path: '/#about',
        type: 'frontend',
        section: 'about',
        icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        enabled: true
      },
      {
        label: 'Contact',
        path: '/#contact',
        type: 'frontend',
        section: 'contact',
        icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
        enabled: true
      }
    ],
    
    // Authentication navigation items  
    auth: [
      {
        label: 'Login',
        path: '/login',
        type: 'backend',
        icon: 'M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1',
        enabled: true
      },
      {
        label: 'Register',
        path: '/register',
        type: 'backend',
        icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
        enabled: true
      }
    ],
    
    // Call-to-action navigation
    cta: [
      {
        label: 'Book Now',
        path: '/booking',
        type: 'backend',
        style: 'primary',
        icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
        enabled: true
      }
    ]
  },
  
  // Organization branding
  organization: {
    name: 'CloudIA Medical',
    logo: '/images/logo.png',
    primary_color: '#3B82F6',
    secondary_color: '#059669'
  }
}

export default NAVIGATION_CONFIG