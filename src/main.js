import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Priority authentication check before mounting the app
import { useAuthStore } from './stores/auth'

// Initialize auth store and wait for priority check
useAuthStore().initialize().then(() => {
  console.log('Auth initialized, mounting app...')
  app.mount('#app')
}).catch((error) => {
  console.error('Auth initialization failed:', error)
  // Mount app anyway to show error states
  app.mount('#app')
})