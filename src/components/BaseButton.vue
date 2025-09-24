<template>
  <button
    :class="classes"
    :disabled="disabled"
  >
    <div v-if="loading" class="loading-spinner mr-2"></div>
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const classes = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold uppercase tracking-widest transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700 focus:ring-blue-500 active:bg-blue-900',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:bg-gray-700 focus:ring-gray-500 active:bg-gray-900',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 focus:ring-red-500 active:bg-red-900'
  }
  
  return `${baseClasses} ${variantClasses[props.variant]}`
})
</script>