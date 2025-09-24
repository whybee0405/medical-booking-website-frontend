import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  
  server: {
    port: 5173,
    host: true,
    hmr: {
      host: 'localhost',
    },
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: true,
  },

  optimizeDeps: {
    include: ['vue', 'vue-router', 'axios', 'dayjs']
  }
})
