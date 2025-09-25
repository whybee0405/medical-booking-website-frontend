<template>
  <div class="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-sm z-50">
    <h3 class="font-bold text-gray-900 mb-2">Auth Debug Panel</h3>
    
    <div class="space-y-2 text-sm">
      <div class="flex justify-between">
        <span>Status:</span>
        <span :class="authState.isAuthenticated ? 'text-green-600' : 'text-red-600'">
          {{ authState.isAuthenticated ? 'Logged In' : 'Not Logged In' }}
        </span>
      </div>
      
      <div v-if="authState.user" class="border-t pt-2">
        <div class="font-semibold">User Info:</div>
        <div>Name: {{ authState.user.name }}</div>
        <div>Email: {{ authState.user.email }}</div>
        <div>Role: {{ authState.user.role || 'N/A' }}</div>
      </div>
      
      <div class="border-t pt-2">
        <div class="font-semibold">Backend URL:</div>
        <div class="text-xs text-gray-600">{{ backendUrl }}</div>
      </div>
      
      <div class="space-y-1 border-t pt-2">
        <button 
          @click="testAuth" 
          class="w-full bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
          :disabled="loading"
        >
          {{ loading ? 'Testing...' : 'Test Auth' }}
        </button>
        
        <button 
          @click="authService.logout()" 
          class="w-full bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
          v-if="authState.isAuthenticated"
        >
          Logout
        </button>
        
        <a 
          :href="`${backendUrl}/login`"
          class="block w-full bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 text-center"
          v-else
        >
          Go to Login
        </a>
      </div>
      
      <div v-if="error" class="text-red-600 text-xs border-t pt-2">
        Error: {{ error }}
      </div>
      
      <div v-if="testResponse" class="text-xs border-t pt-2">
        <div class="font-semibold">API Response:</div>
        <pre class="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-20">{{ testResponse }}</pre>
      </div>
    </div>
    
    <button 
      @click="visible = false" 
      class="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
    >
      ×
    </button>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { authService } from '../services'

// Props
const props = defineProps({
  visible: {
    type: Boolean,
    default: true
  }
})

// State
const authState = reactive({
  isAuthenticated: false,
  user: null,
  profileNavigation: []
})

const loading = ref(false)
const error = ref('')
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
const testResponse = ref('')

// Methods
const testAuth = async () => {
  loading.value = true
  error.value = ''
  testResponse.value = ''
  
  try {
    // Test direct API call
    const response = await fetch(`${backendUrl}/api/user-status`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    
    const data = await response.json()
    testResponse.value = JSON.stringify(data, null, 2)
    console.log('Direct API test result:', data)
    
    // Also test through auth service
    const isAuth = await authService.checkAuth()
    console.log('Auth service test result:', isAuth)
    console.log('User data:', authService.getUser())
  } catch (err) {
    error.value = err.message
    console.error('Auth test error:', err)
  } finally {
    loading.value = false
  }
}

// Authentication event handler
const handleAuthStateChange = ({ isAuthenticated, user }) => {
  authState.isAuthenticated = isAuthenticated
  authState.user = user
  authState.profileNavigation = isAuthenticated ? authService.getProfileNavigation() : []
  console.log('Auth state changed:', { isAuthenticated, user })
}

// Lifecycle
onMounted(async () => {
  // Set up authentication listener
  authService.addAuthListener(handleAuthStateChange)
  
  // Initialize authentication
  await authService.initialize()
})
</script>

<style scoped>
.max-w-sm {
  max-width: 20rem;
}
</style>