<template>
  <nav class="navbar fixed w-full z-50 transition-all duration-300 ease-out bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0 logo-container">
          <a href="/" class="flex items-center space-x-3 group">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg medical-logo group-hover:shadow-xl transition-all duration-300">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
              </svg>
            </div>
            <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-blue-900 transition-all duration-300">
              {{ config.organization?.name || 'CloudIA Medical' }}
            </span>
          </a>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <!-- Main Navigation Links -->
          <div class="flex items-center space-x-6">
            <template v-for="item in navigation.main" :key="item.label">
              <component 
                :is="getNavigationComponent(item)"
                :href="getNavigationHref(item)"
                :to="getRouterLink(item)"
                @click="handleNavClick(item)"
                class="nav-link text-gray-700 px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 relative group"
                :class="{
                  'text-blue-600': isActiveSectionRoute(item),
                  'hover:text-blue-600': !isActiveSectionRoute(item)
                }"
              >
                {{ item.label }}
                <span 
                  class="absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300" 
                  :class="{
                    'w-full': isActiveSectionRoute(item),
                    'w-0 group-hover:w-full': !isActiveSectionRoute(item)
                  }"
                ></span>
              </component>
            </template>
          </div>

          <!-- Auth & CTA Section -->
          <div class="flex items-center space-x-4">
            <!-- Profile Dropdown (when authenticated) -->
            <ProfileDropdown 
              v-if="authState.isAuthenticated"
              :user="authState.user"
              :navigationItems="authState.profileNavigation"
            />
            
            <!-- Authentication Links (when not authenticated) -->
            <template v-else>
              <template v-for="item in navigation.auth" :key="item.label">
                <a 
                  :href="getFullUrl(item)" 
                  class="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105"
                >
                  {{ item.label }}
                </a>
              </template>
            </template>

            <!-- Book Now Chip Button -->
            <template v-for="cta in navigation.cta" :key="cta.label">
              <a 
                v-if="cta.enabled !== false"
                :href="getFullUrl(cta)" 
                class="book-now-chip inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 transform"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="cta.icon || 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'"/>
                </svg>
                {{ cta.label }}
              </a>
            </template>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="mobile-menu-button p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
            <svg class="h-6 w-6 transition-transform duration-300" :class="{ 'rotate-90': mobileMenuOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <div class="md:hidden mobile-menu overflow-hidden transition-all duration-300 ease-in-out" :class="{ 'max-h-96 opacity-100': mobileMenuOpen, 'max-h-0 opacity-0': !mobileMenuOpen }">
        <div class="px-4 pt-2 pb-4 space-y-2 bg-white border-t border-gray-100">
          <!-- Mobile Main Navigation -->
          <template v-for="item in navigation.main" :key="item.label + '-mobile'">
            <component 
              :is="getNavigationComponent(item)"
              :href="getNavigationHref(item)"
              :to="getRouterLink(item)"
              @click="handleNavClick(item); mobileMenuOpen = false"
              class="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
            >
              {{ item.label }}
            </component>
          </template>
          
          <!-- Mobile Authentication Section -->
          <div class="border-t border-gray-100 pt-3 mt-3 space-y-2">
            <!-- Profile Info (when authenticated) -->
            <div v-if="authState.isAuthenticated" class="px-3 py-2">
              <div class="flex items-center space-x-3 mb-3">
                <div 
                  class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                >
                  {{ authState.user?.name?.charAt(0)?.toUpperCase() || 'U' }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">
                    {{ authState.user?.name || 'User' }}
                  </p>
                  <p class="text-xs text-gray-600 truncate">
                    {{ authState.user?.email || '' }}
                  </p>
                </div>
              </div>
              
              <!-- Profile Navigation Items -->
              <template v-for="item in authState.profileNavigation" :key="item.path + '-mobile'">
                <router-link
                  :to="item.path"
                  @click="mobileMenuOpen = false"
                  class="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  <div 
                    class="w-4 h-4 mr-3"
                    :class="`text-${item.color}-500`"
                  >
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                      <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
                    </svg>
                  </div>
                  {{ item.label }}
                </router-link>
              </template>
              
              <!-- Mobile Logout -->
              <button
                @click="authService.logout(); mobileMenuOpen = false"
                class="flex items-center w-full text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 mt-2"
              >
                <div class="w-4 h-4 mr-3">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                </div>
                Sign Out
              </button>
            </div>
            
            <!-- Authentication Links (when not authenticated) -->
            <template v-else>
              <template v-for="item in navigation.auth" :key="item.label + '-mobile'">
                <a 
                  :href="getFullUrl(item)" 
                  class="block text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                >
                  {{ item.label }}
                </a>
              </template>
            </template>
          </div>
          
          <!-- Mobile Book Now Button -->
          <div class="pt-3">
            <template v-for="cta in navigation.cta" :key="cta.label + '-mobile'">
              <a 
                v-if="cta.enabled !== false"
                :href="getFullUrl(cta)" 
                class="block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-full text-center font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              >
                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="cta.icon || 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'"/>
                </svg>
                {{ cta.label }}
              </a>
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, reactive } from 'vue'
import { NAVIGATION_CONFIG } from '../constants/navigation.js'
import { authService } from '../services'
import ProfileDropdown from './ProfileDropdown.vue'

// Props
const props = defineProps({
  isHomepage: {
    type: Boolean,
    default: true
  }
})

// Reactive state
const config = ref(NAVIGATION_CONFIG)
const navigation = ref(NAVIGATION_CONFIG.navigation)
const mobileMenuOpen = ref(false)
const loading = ref(false)
const error = ref(null)

// Authentication state - initialize with current service state
const authState = reactive({
  isAuthenticated: authService.isLoggedIn(),
  user: authService.getUser(),
  profileNavigation: authService.isLoggedIn() ? authService.getProfileNavigation() : []
})

// Computed properties
const logoLink = computed(() => 'a') // Always use anchor tag for logo

// Methods
const fetchNavigationConfig = async () => {
  try {
    loading.value = true
    error.value = null
    
    const apiUrl = import.meta.env.VITE_NAVIGATION_API_URL || `${config.value.backend_url}/api/navigation/config`
    const response = await fetch(apiUrl)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    // Update configuration
    config.value = {
      frontend_url: data.frontend_url || config.value.frontend_url,
      backend_url: data.backend_url || config.value.backend_url,
      navigation: data.navigation || config.value.navigation,
      organization: data.organization || config.value.organization
    }
    
    navigation.value = config.value.navigation
    
  } catch (err) {
    console.warn('Navigation API failed, using fallback config:', err)
    error.value = err.message
    // Keep using fallback config
  } finally {
    loading.value = false
  }
}

const getNavigationComponent = (item) => {
  if (item.type === 'frontend' && item.section) {
    return 'button'
  }
  return 'a'
}

const getNavigationHref = (item) => {
  if (item.type === 'frontend' && item.section) {
    return null // Use button for frontend sections
  }
  return getFullUrl(item)
}

const getRouterLink = (item) => {
  if (item.type === 'frontend' && !item.section) {
    return item.path
  }
  return null
}

const getFullUrl = (item) => {
  if (item.type === 'backend') {
    return `${config.value.backend_url}${item.path}`
  } else if (item.type === 'frontend') {
    return `${config.value.frontend_url}${item.path}`
  }
  return item.path
}

const handleNavClick = (item) => {
  // Emit navigation click event for parent component to handle
  if (item.section && document.getElementById(item.section)) {
    // Scroll to section for frontend navigation
    const element = document.getElementById(item.section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  // Close mobile menu
  mobileMenuOpen.value = false
}

const isActiveRoute = (item) => {
  // Check if current route matches the navigation item
  if (item.section) {
    // For section-based navigation, check if we're on the homepage and the section is in view
    const currentHash = window.location.hash.substring(1)
    return currentHash === item.section || (currentHash === '' && item.section === 'home')
  }
  
  // For other routes, check current path
  return window.location.pathname === item.path
}

// Add scroll listener to update active states
const activeSection = ref('home')
const updateActiveSection = () => {
  const sections = ['home', 'services', 'about', 'contact']
  const scrollPosition = window.scrollY + 100 // Offset for navbar
  
  for (let i = sections.length - 1; i >= 0; i--) {
    const element = document.getElementById(sections[i])
    if (element && element.offsetTop <= scrollPosition) {
      activeSection.value = sections[i]
      break
    }
  }
}

// Enhanced isActiveRoute that considers scroll position for sections
const isActiveSectionRoute = (item) => {
  if (item.section) {
    return activeSection.value === item.section
  }
  return window.location.pathname === item.path
}

// Authentication event handler
const handleAuthStateChange = ({ isAuthenticated, user }) => {
  authState.isAuthenticated = isAuthenticated
  authState.user = user
  authState.profileNavigation = isAuthenticated ? authService.getProfileNavigation() : []
}

// Lifecycle
onMounted(async () => {
  // Load navigation configuration
  await fetchNavigationConfig()
  
  // Set up authentication listener
  authService.addAuthListener(handleAuthStateChange)
  
  // Initialize authentication in background (non-blocking)
  authService.initialize()
  
  // Add scroll listener for section-based navigation
  window.addEventListener('scroll', updateActiveSection)
  // Initial active section detection
  updateActiveSection()
})

onUnmounted(() => {
  // Clean up scroll listener
  window.removeEventListener('scroll', updateActiveSection)
})
</script>

<style scoped>
.navbar {
  backdrop-filter: blur(8px);
}

.nav-link:hover .absolute {
  width: 100%;
}

.book-now-chip:hover {
  animation: pulse 0.3s ease-in-out;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.mobile-menu {
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.mobile-menu-button:hover {
  background-color: rgba(59, 130, 246, 0.1);
}

.medical-logo {
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
}

/* Smooth hover effects */
.nav-link,
.book-now-chip,
a {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus states for accessibility */
.nav-link:focus,
.book-now-chip:focus,
button:focus {
  outline: 2px solid #3B82F6;
  outline-offset: 2px;
}
</style>