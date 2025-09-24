import { createRouter, createWebHistory } from 'vue-router'

// Import views
import Welcome from '@/views/Welcome.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Welcome
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