import { createRouter, createWebHistory } from 'vue-router'

// Import views
import Welcome from '@/views/Welcome.vue'
import AuthDebug from '@/views/AuthDebug.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Welcome
  },
  {
    path: '/auth-debug',
    name: 'auth-debug',
    component: AuthDebug
  },
  // Redirect auth routes to backend (since backend handles auth/portal)
  {
    path: '/login',
    redirect: () => {
      window.location.href = 'http://localhost:8000/login'
      return '/'
    }
  },
  {
    path: '/register', 
    redirect: () => {
      window.location.href = 'http://localhost:8000/register'
      return '/'
    }
  },
  // Redirect any other routes to home (since backend handles auth/portal)
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router