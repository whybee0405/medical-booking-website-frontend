<template>
  <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div class="max-w-md mx-auto">
          <div>
            <h1 class="text-2xl font-semibold text-center">Authentication Debug</h1>
          </div>
          
          <!-- Status Display -->
          <div class="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 class="font-medium">Current Status:</h3>
            <div class="mt-2 space-y-1 text-sm">
              <p>Authenticated: <span class="font-mono">{{ authStatus.isAuthenticated }}</span></p>
              <p>User: <span class="font-mono">{{ authStatus.user?.name || 'None' }}</span></p>
              <p>Email: <span class="font-mono">{{ authStatus.user?.email || 'None' }}</span></p>
              <p>Error: <span class="font-mono text-red-600">{{ error || 'None' }}</span></p>
            </div>
          </div>

          <!-- Login Form -->
          <form @submit.prevent="testLogin" class="mt-8 space-y-6">
            <div>
              <label for="email" class="sr-only">Email</label>
              <input 
                id="email"
                v-model="form.email" 
                type="email" 
                required
                class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                placeholder="Email address"
              />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input 
                id="password"
                v-model="form.password" 
                type="password" 
                required
                class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                placeholder="Password"
              />
            </div>
            <div>
              <button 
                type="submit" 
                :disabled="loading"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {{ loading ? 'Testing...' : 'Test Login' }}
              </button>
            </div>
          </form>

          <!-- Manual Tests -->
          <div class="mt-8 space-y-4">
            <h3 class="font-medium">Manual Tests:</h3>
            <div class="space-y-2">
              <button 
                @click="checkAuth"
                class="w-full px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Check Auth Status
              </button>
              <button 
                @click="testCsrf"
                class="w-full px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600"
              >
                Test CSRF Token
              </button>
              <button 
                @click="testApiEndpoint"
                class="w-full px-4 py-2 text-sm bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                Test API Endpoint
              </button>
            </div>
          </div>

          <!-- Response Display -->
          <div v-if="lastResponse" class="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 class="font-medium">Last Response:</h3>
            <pre class="mt-2 text-xs overflow-auto">{{ JSON.stringify(lastResponse, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import authService from '@/services/auth.js'
import CrossDomainAuth from '@/services/crossDomainAuth.js'

const authStatus = reactive({
  isAuthenticated: false,
  user: null
})

const form = reactive({
  email: 'test@example.com',
  password: 'password'
})

const loading = ref(false)
const error = ref('')
const lastResponse = ref(null)
const crossDomainAuth = new CrossDomainAuth()
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

// Test login function
const testLogin = async () => {
  loading.value = true
  error.value = ''
  lastResponse.value = null

  try {
    console.log('Testing login with:', form.email, form.password)
    const result = await crossDomainAuth.login(form.email, form.password)
    
    lastResponse.value = result
    
    if (result.success) {
      authStatus.isAuthenticated = result.authenticated
      authStatus.user = result.user
      error.value = ''
    } else {
      error.value = result.message || 'Login failed'
    }
  } catch (err) {
    console.error('Login test error:', err)
    error.value = err.message || 'Login test failed'
    lastResponse.value = { error: err.message }
  } finally {
    loading.value = false
  }
}

// Check auth status
const checkAuth = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const isAuth = await authService.checkAuth()
    authStatus.isAuthenticated = isAuth
    authStatus.user = authService.getUser()
    lastResponse.value = { authenticated: isAuth, user: authService.getUser() }
  } catch (err) {
    error.value = err.message
    lastResponse.value = { error: err.message }
  } finally {
    loading.value = false
  }
}

// Test CSRF token
const testCsrf = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await fetch(`${backendUrl}/sanctum/csrf-cookie`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    
    lastResponse.value = {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    }
  } catch (err) {
    error.value = err.message
    lastResponse.value = { error: err.message }
  } finally {
    loading.value = false
  }
}

// Test API endpoint
const testApiEndpoint = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await fetch(`${backendUrl}/api/user-status`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    
    const data = await response.json()
    lastResponse.value = {
      status: response.status,
      data: data
    }
  } catch (err) {
    error.value = err.message
    lastResponse.value = { error: err.message }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  checkAuth()
})
</script>