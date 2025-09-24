<template>
  <div class="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
    <div>
      <router-link to="/" class="block">
        <div class="h-20 w-20 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg class="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7V9C15 10.7 16.3 12 18 12S21 10.7 21 9ZM3 9V7L9 7V9C9 10.7 7.7 12 6 12S3 10.7 3 9ZM12 7.5C11.2 7.5 10.5 8.2 10.5 9S11.2 10.5 12 10.5 13.5 9.8 13.5 9 12.8 7.5 12 7.5ZM12 13C13.1 13 14 13.9 14 15V22H10V15C10 13.9 10.9 13 12 13Z"/>
          </svg>
        </div>
      </router-link>
    </div>

    <div class="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
      <slot />
    </div>
  </div>
</template>

<script setup>
// Guest layout for authentication pages
</script>