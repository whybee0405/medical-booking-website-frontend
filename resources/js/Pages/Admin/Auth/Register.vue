<script setup>
import { ref, onMounted } from 'vue';
import InputError from '@/Components/InputError.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'receptionist',
    practice_id: null,
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
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
    <Head title="Staff Registration - CloudIA Medical" />
    
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
                    <div class="flex items-center space-x-4">
                        <Link
                            :href="route('admin.login')"
                            class="text-slate-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                        >
                            ← Back to Login
                        </Link>
                        <Link
                            href="/"
                            class="text-slate-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                        >
                            Public Site
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Main Registration Section -->
        <section class="registration-section relative pt-12 pb-16 px-4 min-h-[calc(100vh-80px)] flex items-center">
            <!-- Animated Background Pattern -->
            <div class="registration-background absolute inset-0 overflow-hidden">
                <!-- Medical Pattern SVG -->
                <svg 
                    id="admin-registration-pattern"
                    class="absolute inset-0 w-full h-full" 
                    viewBox="0 0 1200 800" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <!-- Medical Cross Pattern -->
                    <g opacity="0.08">
                        <!-- Cross 1 -->
                        <path d="M100 100h20v60h60v20h-60v60h-20v-60H40v-20h60v-60z" fill="#60A5FA"/>
                        <path d="M300 200h20v60h60v20h-60v60h-20v-60h-60v-20h60v-60z" fill="#818CF8"/>
                        <path d="M500 120h20v60h60v20h-60v60h-20v-60h-60v-20h60v-60z" fill="#A78BFA"/>
                        <path d="M800 180h20v60h60v20h-60v60h-20v-60h-60v-20h60v-60z" fill="#60A5FA"/>
                        <path d="M1000 140h20v60h60v20h-60v60h-20v-60h-60v-20h60v-60z" fill="#818CF8"/>
                    </g>
                </svg>
            </div>

            <div class="container mx-auto max-w-4xl relative z-10">
                <div class="grid lg:grid-cols-1 gap-12 items-center justify-center">
                    <!-- Registration Form -->
                    <div :class="['max-w-2xl mx-auto w-full', isLoaded ? 'animate-in' : '']" class="animate-slide-up">
                        <div class="registration-form bg-slate-800/80 backdrop-blur-xl p-8 lg:p-12 rounded-3xl shadow-2xl border border-slate-700/50">
                            <!-- Form Header -->
                            <div class="text-center mb-8">
                                <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                </div>
                                <h2 class="text-3xl font-bold text-white mb-2">Staff Registration</h2>
                                <p class="text-slate-400">Create a new staff account for the medical practice</p>
                            </div>

                            <!-- Important Notice -->
                            <div class="mb-6 p-4 bg-amber-500/10 border border-amber-400/30 rounded-xl">
                                <div class="flex items-start space-x-3">
                                    <svg class="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L5.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    <div>
                                        <h4 class="text-amber-300 font-medium text-sm">Authorization Required</h4>
                                        <p class="text-amber-200/80 text-xs mt-1">
                                            Staff registration requires administrator approval. Contact your system administrator for access.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <!-- Registration Form -->
                            <form @submit.prevent="submit" :class="{ 'form-loading': form.processing }" class="space-y-6">
                                <!-- Name Field -->
                                <div>
                                    <label for="name" class="block text-sm font-semibold text-slate-300 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        v-model="form.name"
                                        required
                                        autofocus
                                        autocomplete="name"
                                        class="w-full px-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400 text-white font-medium transition-all duration-300"
                                        placeholder="Enter your full name"
                                    />
                                    <InputError class="mt-2 text-sm text-red-400" :message="form.errors.name" />
                                </div>

                                <!-- Email Field -->
                                <div>
                                    <label for="email" class="block text-sm font-semibold text-slate-300 mb-2">
                                        Staff Email Address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        v-model="form.email"
                                        required
                                        autocomplete="username"
                                        class="w-full px-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400 text-white font-medium transition-all duration-300"
                                        placeholder="Enter your professional email"
                                    />
                                    <InputError class="mt-2 text-sm text-red-400" :message="form.errors.email" />
                                </div>

                                <!-- Role Field -->
                                <div>
                                    <label for="role" class="block text-sm font-semibold text-slate-300 mb-2">
                                        Staff Role
                                    </label>
                                    <select
                                        id="role"
                                        v-model="form.role"
                                        required
                                        class="w-full px-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white font-medium transition-all duration-300"
                                    >
                                        <option value="receptionist">Receptionist</option>
                                        <option value="provider">Healthcare Provider</option>
                                        <option value="admin">Administrator</option>
                                    </select>
                                    <InputError class="mt-2 text-sm text-red-400" :message="form.errors.role" />
                                </div>

                                <!-- Password Fields -->
                                <div class="grid md:grid-cols-2 gap-4">
                                    <!-- Password Field -->
                                    <div>
                                        <label for="password" class="block text-sm font-semibold text-slate-300 mb-2">
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            v-model="form.password"
                                            required
                                            autocomplete="new-password"
                                            class="w-full px-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400 text-white font-medium transition-all duration-300"
                                            placeholder="Create a password"
                                        />
                                        <InputError class="mt-2 text-sm text-red-400" :message="form.errors.password" />
                                    </div>

                                    <!-- Confirm Password Field -->
                                    <div>
                                        <label for="password_confirmation" class="block text-sm font-semibold text-slate-300 mb-2">
                                            Confirm Password
                                        </label>
                                        <input
                                            id="password_confirmation"
                                            type="password"
                                            v-model="form.password_confirmation"
                                            required
                                            autocomplete="new-password"
                                            class="w-full px-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400 text-white font-medium transition-all duration-300"
                                            placeholder="Confirm your password"
                                        />
                                        <InputError class="mt-2 text-sm text-red-400" :message="form.errors.password_confirmation" />
                                    </div>
                                </div>

                                <!-- Practice ID Field (Optional for now) -->
                                <div>
                                    <label for="practice_id" class="block text-sm font-semibold text-slate-300 mb-2">
                                        Practice ID <span class="text-slate-500 text-xs">(Optional)</span>
                                    </label>
                                    <input
                                        id="practice_id"
                                        type="number"
                                        v-model="form.practice_id"
                                        class="w-full px-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400 text-white font-medium transition-all duration-300"
                                        placeholder="Enter practice ID (if known)"
                                    />
                                    <InputError class="mt-2 text-sm text-red-400" :message="form.errors.practice_id" />
                                    <p class="mt-1 text-xs text-slate-500">Leave blank if you don't know the practice ID</p>
                                </div>

                                <!-- Submit Button -->
                                <button
                                    type="submit"
                                    :disabled="form.processing"
                                    class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
                                >
                                    <span v-if="!form.processing" class="flex items-center justify-center">
                                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                        </svg>
                                        Create Staff Account
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

                            <!-- Login Link -->
                            <div class="mt-8 text-center">
                                <p class="text-slate-400">
                                    Already have a staff account?
                                    <Link
                                        :href="route('admin.login')"
                                        class="font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200 ml-1"
                                    >
                                        Sign In Here
                                    </Link>
                                </p>
                            </div>

                            <!-- Privacy Notice -->
                            <div class="mt-6 p-4 bg-slate-700/30 border border-slate-600/50 rounded-xl">
                                <div class="flex items-start space-x-3">
                                    <svg class="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <div>
                                        <h4 class="text-slate-300 font-medium text-sm">Privacy & Security</h4>
                                        <p class="text-slate-400 text-xs mt-1">
                                            Your information is protected and used only for medical practice management. All data is encrypted and HIPAA compliant.
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
/* Modern Animations for Admin Registration Page */
.animate-slide-up {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
    transition: all 0.9s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-slide-up.animate-in {
    opacity: 1;
    transform: translateY(0) scale(1);
}

/* Registration Form Enhancements */
.registration-form {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.registration-form:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}

/* Input Field Animations */
input, select {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

input:focus, select:focus {
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
.registration-background {
    animation: float 20s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    25% { transform: translateY(-10px) rotate(1deg); }
    50% { transform: translateY(-5px) rotate(-1deg); }
    75% { transform: translateY(-15px) rotate(0.5deg); }
}

/* Medical Pattern Animation */
#admin-registration-pattern path {
    animation: cross-rotate 8s linear infinite;
}

@keyframes cross-rotate {
    0% { opacity: 0.08; }
    25% { opacity: 0.12; }
    50% { opacity: 0.08; }
    75% { opacity: 0.10; }
    100% { opacity: 0.08; }
}

/* Responsive Design */
@media (max-width: 768px) {
    .registration-form:hover {
        transform: none;
    }
    
    input:focus, select:focus {
        transform: none;
    }
}

/* Loading states */
.form-loading {
    pointer-events: none;
    opacity: 0.7;
}

/* Enhanced focus states */
input:focus-visible, select:focus-visible {
    outline: 2px solid rgb(59, 130, 246);
    outline-offset: 2px;
}

button:focus-visible {
    outline: 2px solid rgb(59, 130, 246);
    outline-offset: 2px;
}
</style>
