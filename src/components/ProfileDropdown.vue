<template>
  <div class="relative" ref="profileDropdownRef">
    <!-- Profile Button -->
    <button
      @click="toggleDropdown"
      class="flex items-center space-x-2 p-2 rounded-full hover:bg-white/10 transition-all duration-200 group"
      :class="{ 'bg-white/10': isOpen }"
    >
      <!-- User Avatar -->
      <div class="relative">
        <div 
          class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg ring-2 ring-white/20"
        >
          {{ userInitials }}
        </div>
        <!-- Online Status Indicator -->
        <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white shadow-sm"></div>
      </div>
      
      <!-- User Info (Desktop) -->
      <div class="hidden md:flex flex-col items-start">
        <span class="text-sm font-medium text-gray-900 leading-tight">
          {{ user?.name || 'User' }}
        </span>
        <span class="text-xs text-gray-600 leading-tight">
          {{ user?.email || '' }}
        </span>
      </div>

      <!-- Chevron -->
      <ChevronDownIcon 
        class="w-4 h-4 text-gray-700 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-show="isOpen"
        class="absolute right-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl ring-1 ring-black/5 border border-white/20 z-50"
      >
        <!-- User Profile Header -->
        <div class="px-4 py-4 border-b border-gray-200/50">
          <div class="flex items-center space-x-3">
            <div 
              class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg"
            >
              {{ userInitials }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-gray-900 truncate">
                {{ user?.name || 'User' }}
              </p>
              <p class="text-xs text-gray-600 truncate">
                {{ user?.email || '' }}
              </p>
              <div v-if="user?.role" class="mt-1">
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ formatRole(user.role) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="py-2">
          <a
            :href="`${backendUrl}/dashboard`"
            @click="closeDropdown"
            class="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
          >
            <div class="w-5 h-5 mr-3 text-blue-500 group-hover:text-blue-600 transition-colors duration-150">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
            </div>
            <span class="flex-1">Dashboard</span>
            <ChevronRightIcon class="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
          </a>

          <a
            :href="`${backendUrl}/profile`"
            @click="closeDropdown"
            class="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
          >
            <div class="w-5 h-5 mr-3 text-green-500 group-hover:text-green-600 transition-colors duration-150">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <span class="flex-1">My Profile</span>
            <ChevronRightIcon class="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
          </a>

          <a
            :href="`${backendUrl}/family-members`"
            @click="closeDropdown"
            class="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
          >
            <div class="w-5 h-5 mr-3 text-purple-500 group-hover:text-purple-600 transition-colors duration-150">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <span class="flex-1">Family Members</span>
            <ChevronRightIcon class="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
          </a>

          <a
            :href="`${backendUrl}/appointments`"
            @click="closeDropdown"
            class="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
          >
            <div class="w-5 h-5 mr-3 text-indigo-500 group-hover:text-indigo-600 transition-colors duration-150">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5M9 12.75l2.25 2.25L15 11.25" />
              </svg>
            </div>
            <span class="flex-1">My Appointments</span>
            <ChevronRightIcon class="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
          </a>
        </div>

        <!-- Divider -->
        <hr class="border-gray-200/50 mx-4">

        <!-- Account Actions -->
        <div class="py-2">
          <button
            @click="handleLogout"
            class="group flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-150"
          >
            <div class="w-5 h-5 mr-3">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
            </div>
            <span class="flex-1 text-left">Sign Out</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { authService } from '../services'

// Props
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

// Reactive state
const isOpen = ref(false)
const profileDropdownRef = ref(null)

// Computed properties
const userInitials = computed(() => {
  if (!props.user?.name) return 'U'
  
  const names = props.user.name.split(' ')
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase()
  }
  
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
})

const backendUrl = computed(() => {
  return import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
})

// Methods
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const handleLogout = async () => {
  closeDropdown()
  
  try {
    await authService.logout()
  } catch (error) {
    console.error('Logout failed:', error)
    // Fallback - redirect to backend login
    window.location.href = `${backendUrl.value}/login`
  }
}

const formatRole = (role) => {
  return role.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ')
}

// Click outside handler
const handleClickOutside = (event) => {
  if (profileDropdownRef.value && !profileDropdownRef.value.contains(event.target)) {
    closeDropdown()
  }
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Additional animations and effects */
.group:hover .w-5 {
  transform: scale(1.1);
}

/* Smooth transitions for icons */
.w-5, .w-4 {
  transition: all 0.2s ease;
}

/* Enhanced backdrop blur effect */
.backdrop-blur-xl {
  backdrop-filter: blur(20px);
}
</style>