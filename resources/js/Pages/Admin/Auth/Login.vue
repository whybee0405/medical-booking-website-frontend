<script setup>
import { ref, onMounted } from 'vue';
import InputError from '@/Components/InputError.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

defineProps({
    canResetPassword: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};

// Animation control
const isLoaded = ref(false);

onMounted(() => {
    setTimeout(() => {
        isLoaded.value = true;
    }, 100);
});
</script>

<template>
    <Head title="Admin Sign In - CloudIA Medical" />
    
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <!-- Admin Portal Header -->
        <div class="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50">
            <div class="max-w-7xl mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <h1 class="text-white font-bold text-lg">CloudIA Medical</h1>
                            <p class="text-slate-400 text-sm">Staff Portal</p>
                        </div>
                    </div>
                    <Link
                        href="/"
                        class="text-slate-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                    >
                        ← Back to Public Site
                    </Link>
                </div>
            </div>
        </div>
        
        <!-- Main Login Section -->
        <section class="login-section relative pt-12 pb-16 px-4 min-h-[calc(100vh-80px)] flex items-center">
            <!-- Animated Background Pattern -->
            <div class="login-background absolute inset-0 overflow-hidden">
                <!-- Medical Pattern SVG -->
                <svg 
                    id="admin-medical-pattern"
                    class="absolute inset-0 w-full h-full" 
                    viewBox="0 0 1200 800" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <!-- Medical Cross Pattern -->
                    <g opacity="0.1">
                        <!-- Cross 1 -->
                        <path d="M100 100h20v60h60v20h-60v60h-20v-60H40v-20h60v-60z" fill="#60A5FA"/>
                        <path d="M300 200h20v60h60v20h-60v60h-20v-60h-60v-20h60v-60z" fill="#818CF8"/>
                        <path d="M500 120h20v60h60v20h-60v60h-20v-60h-60v-20h60v-60z" fill="#A78BFA"/>
                        <path d="M800 180h20v60h60v20h-60v60h-20v-60h-60v-20h60v-60z" fill="#60A5FA"/>
                        <path d="M1000 140h20v60h60v20h-60v60h-20v-60h-60v-20h60v-60z" fill="#818CF8"/>
                    </g>
                    
                    <!-- Medical Circles -->
                    <g opacity="0.05">
                        <circle cx="200" cy="300" r="40" fill="#60A5FA"/>
                        <circle cx="600" cy="350" r="60" fill="#818CF8"/>
                        <circle cx="900" cy="300" r="35" fill="#A78BFA"/>
                        <circle cx="300" cy="600" r="45" fill="#60A5FA"/>
                        <circle cx="800" cy="650" r="50" fill="#818CF8"/>
                    </g>
                </svg>
            </div>

            <div class="container mx-auto max-w-6xl relative z-10">
                <div class="grid lg:grid-cols-2 gap-12 items-center">
                    <!-- Left Content - Welcome Section -->
                    <div :class="['space-y-8', isLoaded ? 'animate-in' : '']" class="animate-fade-in">
                        <!-- Header -->
                        <div>
                            <div class="inline-flex items-center px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30 mb-6">
                                <svg class="w-4 h-4 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span class="text-blue-300 text-sm font-medium">Secure Staff Access</span>
                            </div>
                            
                            <h1 class="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                Staff
                                <span class="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                                    Portal
                                </span>
                            </h1>
                            <p class="text-xl text-slate-300 leading-relaxed">
                                Access your administrative dashboard to manage patients, appointments, and practice operations.
                            </p>
                        </div>

                        <!-- Features List -->
                        <div class="space-y-4">
                            <div 
                                v-for="(feature, index) in [
                                    { icon: '👥', title: 'Patient Management', desc: 'View and manage patient records and information' },
                                    { icon: '📅', title: 'Appointment Control', desc: 'Schedule, modify, and track all appointments' },
                                    { icon: '💼', title: 'Provider Dashboard', desc: 'Manage provider schedules and availability' },
                                    { icon: '📊', title: 'Analytics & Reports', desc: 'Access practice insights and performance metrics' }
                                ]"
                                :key="index"
                                :class="[
                                    'feature-item bg-slate-800/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 shadow-lg',
                                    isLoaded ? 'animate-in' : ''
                                ]"
                                :style="{ animationDelay: `${index * 0.1}s` }"
                            >
                                <div class="flex items-center space-x-4">
                                    <div class="text-3xl">{{ feature.icon }}</div>
                                    <div>
                                        <h3 class="font-semibold text-white">{{ feature.title }}</h3>
                                        <p class="text-slate-400 text-sm">{{ feature.desc }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Content - Login Form -->
                    <div :class="['', isLoaded ? 'animate-in' : '']" class="animate-slide-up">
                        <div class="login-form bg-slate-800/80 backdrop-blur-xl p-8 lg:p-12 rounded-3xl shadow-2xl border border-slate-700/50">
                            <!-- Form Header -->
                            <div class="text-center mb-8">
                                <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h2 class="text-3xl font-bold text-white mb-2">Staff Sign In</h2>
                                <p class="text-slate-400">Enter your staff credentials to access the admin portal</p>
                            </div>

                            <!-- Status Message -->
                            <div v-if="status" class="mb-6 p-4 bg-green-500/20 border border-green-400/30 rounded-xl backdrop-blur-sm">
                                <p class="text-green-300 text-sm font-medium text-center">{{ status }}</p>
                            </div>

                            <!-- Login Form -->
                            <form @submit.prevent="submit" :class="{ 'form-loading': form.processing }" class="space-y-6">
                                <!-- Email Field -->
                                <div>
                                    <label for="email" class="block text-sm font-semibold text-slate-300 mb-2">
                                        Staff Email Address
                                    </label>
                                    <div class="relative">
                                        <input
                                            id="email"
                                            type="email"
                                            v-model="form.email"
                                            required
                                            autofocus
                                            autocomplete="username"
                                            class="w-full px-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400 text-white font-medium transition-all duration-300"
                                            placeholder="Enter your staff email"
                                        />
                                        <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                            <svg class="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                            </svg>
                                        </div>
                                    </div>
                                    <InputError class="mt-2 text-sm text-red-400" :message="form.errors.email" />
                                </div>

                                <!-- Password Field -->
                                <div>
                                    <label for="password" class="block text-sm font-semibold text-slate-300 mb-2">
                                        Password
                                    </label>
                                    <div class="relative">
                                        <input
                                            id="password"
                                            type="password"
                                            v-model="form.password"
                                            required
                                            autocomplete="current-password"
                                            class="w-full px-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400 text-white font-medium transition-all duration-300"
                                            placeholder="Enter your password"
                                        />
                                        <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                            <svg class="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <InputError class="mt-2 text-sm text-red-400" :message="form.errors.password" />
                                </div>

                                <!-- Remember Me -->
                                <div class="flex items-center">
                                    <label class="flex items-center">
                                        <input
                                            type="checkbox"
                                            v-model="form.remember"
                                            name="remember"
                                            class="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2 transition-colors duration-200"
                                        />
                                        <span class="ml-2 text-sm text-slate-300 font-medium">Remember me on this device</span>
                                    </label>
                                </div>

                                <!-- Submit Button -->
                                <button
                                    type="submit"
                                    :disabled="form.processing"
                                    class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
                                >
                                    <span v-if="!form.processing" class="flex items-center justify-center">
                                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                        Access Staff Portal
                                    </span>
                                    <span v-else class="flex items-center justify-center">
                                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Authenticating...
                                    </span>
                                </button>
                            </form>

                            <!-- Register Link (Only for authorized personnel) -->
                            <div class="mt-8 text-center">
                                <p class="text-slate-400 text-sm">
                                    Need a staff account?
                                    <Link
                                        :href="route('register')"
                                        class="font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200 ml-1"
                                    >
                                        Contact Administrator
                                    </Link>
                                </p>
                            </div>

                            <!-- Security Notice -->
                            <div class="mt-6 p-4 bg-amber-500/10 border border-amber-400/30 rounded-xl">
                                <div class="flex items-start space-x-3">
                                    <svg class="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L5.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    <div>
                                        <h4 class="text-amber-300 font-medium text-sm">Security Notice</h4>
                                        <p class="text-amber-200/80 text-xs mt-1">
                                            This portal is for authorized staff only. All access attempts are logged and monitored.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
/* Modern Animations for Admin Login Page */
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

/* Login Form Enhancements */
.login-form {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.login-form:hover {
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

/* Admin Background Animation */
.login-background {
    animation: float 20s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    25% { transform: translateY(-10px) rotate(1deg); }
    50% { transform: translateY(-5px) rotate(-1deg); }
    75% { transform: translateY(-15px) rotate(0.5deg); }
}

/* Medical Pattern Animation */
#admin-medical-pattern circle {
    animation: pulse 4s ease-in-out infinite;
}

#admin-medical-pattern path {
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
    .login-form:hover {
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
