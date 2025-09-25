<template>
  <!-- Show loading screen while authentication is being verified -->
  <AuthLoader v-if="authStore.isLoading" />
  
  <!-- Show main app once auth is verified -->
  <router-view v-else />
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AuthLoader from '@/components/AuthLoader.vue'

const authStore = useAuthStore()
</script>

<style>
#app {
  min-height: 100vh;
}
</style>