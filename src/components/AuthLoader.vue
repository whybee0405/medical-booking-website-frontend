<template>
  <div class="auth-loader">
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div class="text-center">
        <!-- Logo -->
        <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
          </svg>
        </div>
        
        <!-- Loading Animation -->
        <div class="relative">
          <div class="w-12 h-12 mx-auto mb-4">
            <div class="w-12 h-12 border-4 border-blue-200/30 border-t-blue-400 rounded-full animate-spin"></div>
          </div>
          
          <!-- Pulsing dots -->
          <div class="flex justify-center space-x-1 mb-4">
            <div class="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style="animation-delay: 0s"></div>
            <div class="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
            <div class="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
          </div>
        </div>
        
        <!-- Text -->
        <h2 class="text-xl font-semibold text-white mb-2">CloudIA Medical</h2>
        <p class="text-blue-200 text-sm">Preparing your portal...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Simple auth loading component
</script>

<style scoped>
.auth-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}
</style>