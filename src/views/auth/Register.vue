<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
    <!-- Animated Background Pattern -->
    <div class="absolute inset-0 register-background">
      <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="admin-register-medical-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1.5" fill="rgb(59, 130, 246)" opacity="0.1"/>
            <path d="M8,10 L12,10 M10,8 L10,12" stroke="rgb(59, 130, 246)" stroke-width="0.5" opacity="0.15"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#admin-register-medical-pattern)"/>
      </svg>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 min-h-screen flex flex-col lg:flex-row">
      <!-- Left Side - Features -->
      <div class="lg:w-1/2 flex flex-col justify-center p-8 lg:p-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div class="max-w-md mx-auto lg:mx-0" :class="['animate-fade-in', isLoaded && 'animate-in']">
          <h1 class="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Join Our Medical Portal
          </h1>
          <p class="text-xl text-blue-100 mb-12">
            Create your account to access comprehensive healthcare services, manage appointments, and connect with medical professionals.
          </p>
          
          <div class="space-y-6">
            <div 
              v-for="(feature, index) in features" 
              :key="index"
              class="feature-item flex items-center space-x-4 p-4 rounded-lg bg-white/10 backdrop-blur-sm"
              :style="{ transitionDelay: `${index * 100}ms` }"
              :class="isLoaded && 'animate-in'"
            >
              <div class="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <i :class="feature.icon" class="text-xl text-white"></i>
              </div>
              <div>
                <h3 class="font-semibold text-lg">{{ feature.title }}</h3>
                <p class="text-blue-100 text-sm">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Register Form -->
      <div class="lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div 
          class="w-full max-w-md register-form bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20"
          :class="['animate-slide-up', isLoaded && 'animate-in']"
        >
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p class="text-gray-600">Join thousands of patients in our secure platform</p>
          </div>

          <div v-if="authStore.error" class="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
            <i class="fas fa-exclamation-circle mr-2"></i>
            {{ authStore.error }}
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6" :class="{ 'form-loading': authStore.loading }">
            <div>
              <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                required
                autofocus
                autocomplete="name"
                placeholder="Enter your full name"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white/50"
                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-100': errors.name }"
              />
              <p v-if="errors.name" class="mt-2 text-sm text-red-600">
                <i class="fas fa-exclamation-circle mr-1"></i>
                {{ errors.name }}
              </p>
            </div>

            <div>
              <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                required
                autocomplete="username"
                placeholder="Enter your email address"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white/50"
                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-100': errors.email }"
              />
              <p v-if="errors.email" class="mt-2 text-sm text-red-600">
                <i class="fas fa-exclamation-circle mr-1"></i>
                {{ errors.email }}
              </p>
            </div>

            <div>
              <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                v-model="form.password"
                required
                autocomplete="new-password"
                placeholder="Create a strong password"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white/50"
                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-100': errors.password }"
              />
              <p v-if="errors.password" class="mt-2 text-sm text-red-600">
                <i class="fas fa-exclamation-circle mr-1"></i>
                {{ errors.password }}
              </p>
            </div>

            <div>
              <label for="password_confirmation" class="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                id="password_confirmation"
                v-model="form.password_confirmation"
                required
                autocomplete="new-password"
                placeholder="Confirm your password"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white/50"
                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-100': errors.password_confirmation }"
              />
              <p v-if="errors.password_confirmation" class="mt-2 text-sm text-red-600">
                <i class="fas fa-exclamation-circle mr-1"></i>
                {{ errors.password_confirmation }}
              </p>
            </div>

            <div class="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                v-model="form.terms"
                required
                class="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label for="terms" class="text-sm text-gray-600">
                I agree to the <a href="#" class="text-blue-600 hover:text-blue-800">Terms of Service</a> and <a href="#" class="text-blue-600 hover:text-blue-800">Privacy Policy</a>. I understand that my medical information will be handled in accordance with HIPAA regulations.
              </label>
            </div>

            <button
              type="submit"
              :disabled="authStore.loading || !form.terms"
              class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!authStore.loading" class="flex items-center justify-center">
                <i class="fas fa-user-plus mr-2"></i>
                Create Account
              </span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </span>
            </button>
          </form>

          <div class="mt-8 text-center">
            <p class="text-gray-600">Already have an account?</p>
            <router-link 
              to="/login" 
              class="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
            >
              <i class="fas fa-sign-in-alt mr-2"></i>
              Sign In Here
            </router-link>
          </div>

          <div class="mt-6 pt-6 border-t border-gray-200 text-center">
            <p class="text-xs text-gray-500">
              <i class="fas fa-shield-alt text-green-600 mr-1"></i>
              Your information is protected with enterprise-grade security and HIPAA compliance.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isLoaded = ref(false)

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  terms: false
})

const errors = ref({})

const features = [
  {
    icon: 'fas fa-calendar-check',
    title: 'Easy Appointments',
    description: 'Schedule and manage your medical appointments with ease'
  },
  {
    icon: 'fas fa-file-medical',
    title: 'Medical Records',
    description: 'Secure access to your complete medical history'
  },
  {
    icon: 'fas fa-user-md',
    title: 'Doctor Network',
    description: 'Connect with top healthcare professionals'
  },
  {
    icon: 'fas fa-shield-alt',
    title: 'HIPAA Secure',
    description: 'Your data is protected with the highest security standards'
  }
]

const handleSubmit = async () => {
  errors.value = {}

  // Basic validation
  if (!form.name) {
    errors.value.name = 'Full name is required'
    return
  }
  if (!form.email) {
    errors.value.email = 'Email address is required'
    return
  }
  if (!form.password) {
    errors.value.password = 'Password is required'
    return
  }
  if (form.password.length < 8) {
    errors.value.password = 'Password must be at least 8 characters'
    return
  }
  if (form.password !== form.password_confirmation) {
    errors.value.password_confirmation = 'Passwords do not match'
    return
  }
  if (!form.terms) {
    return
  }

  try {
    await authStore.register({
      name: form.name,
      email: form.email,
      password: form.password,
      password_confirmation: form.password_confirmation
    })
    router.push({ name: 'dashboard' })
  } catch (error) {
    console.error('Registration failed:', error)
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors
    }
  }
}

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})
</script>

<style scoped>
/* Modern Animations for Register Page */
.animate-fade-in {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-slide-up {
  opacity: 0;
  transform: translateY(40px) scale(0.95);
  transition: all 0.9s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-fade-in.animate-in,
.animate-slide-up.animate-in {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Feature Items Animation */
.feature-item {
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-item.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.feature-item:hover {
  transform: translateX(8px) scale(1.02);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

/* Register Form Enhancements */
.register-form {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.register-form:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}

/* Input Field Animations */
input {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

input:focus {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.2);
}

/* Button Hover Effects */
button[type="submit"] {
  position: relative;
  overflow: hidden;
}

button[type="submit"]:not(:disabled):hover {
  box-shadow: 0 15px 35px rgba(59, 130, 246, 0.4);
}

button[type="submit"]:not(:disabled):active {
  transform: scale(0.98);
}

/* Background Animation */
.register-background {
  animation: float 20s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(1deg); }
  50% { transform: translateY(-5px) rotate(-1deg); }
  75% { transform: translateY(-15px) rotate(0.5deg); }
}

/* Medical Pattern Animation */
#admin-register-medical-pattern circle {
  animation: pulse 4s ease-in-out infinite;
}

#admin-register-medical-pattern path {
  animation: cross-rotate 8s linear infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.3; }
}

@keyframes cross-rotate {
  0% { opacity: 0.1; }
  25% { opacity: 0.2; }
  50% { opacity: 0.1; }
  75% { opacity: 0.15; }
  100% { opacity: 0.1; }
}

/* Responsive Design */
@media (max-width: 768px) {
  .register-form:hover {
    transform: none;
  }
  
  .feature-item:hover {
    transform: scale(1.01);
  }
  
  input:focus {
    transform: none;
  }
}

/* Loading states */
.form-loading {
  pointer-events: none;
  opacity: 0.7;
}

/* Enhanced focus states */
input:focus-visible {
  outline: 2px solid rgb(59, 130, 246);
  outline-offset: 2px;
}

button:focus-visible {
  outline: 2px solid rgb(59, 130, 246);
  outline-offset: 2px;
}
</style>