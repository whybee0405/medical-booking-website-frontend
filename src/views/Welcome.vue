<template>
  <div class="min-h-screen bg-white" :class="{ 'page-loaded': isLoaded }">
    <!-- Navigation -->
    <nav class="navbar fixed w-full z-50 transition-all duration-300 ease-out">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex-shrink-0 logo-container">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg medical-logo">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                </svg>
              </div>
              <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                CloudIA Medical
              </span>
            </div>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-8">
              <button @click="smoothScroll('home')" class="nav-link text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105">Home</button>
              <button @click="smoothScroll('services')" class="nav-link text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105">Services</button>
              <button @click="smoothScroll('about')" class="nav-link text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105">About</button>
              <button @click="smoothScroll('contact')" class="nav-link text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105">Contact</button>
              
              <!-- Authentication Links -->
              <div class="flex items-center space-x-4">
                <a href="http://localhost:8000/login" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105">
                  Login
                </a>
                <a href="http://localhost:8000/register" class="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 hover:from-gray-700 hover:to-gray-800">
                  Register
                </a>
              </div>
              
              <a href="/admin/dashboard" class="cta-button bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-blue-700">
                Patient Portal
              </a>
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="mobile-menu-button text-gray-700 hover:text-blue-600 transition-colors duration-200">
              <svg class="h-6 w-6 transition-transform duration-300" :class="{ 'rotate-180': mobileMenuOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation Menu -->
        <div class="md:hidden mobile-menu" :class="{ 'mobile-menu-open': mobileMenuOpen }">
          <div class="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-lg mt-2">
            <button @click="smoothScroll('home'); mobileMenuOpen = false" class="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200">Home</button>
            <button @click="smoothScroll('services'); mobileMenuOpen = false" class="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200">Services</button>
            <button @click="smoothScroll('about'); mobileMenuOpen = false" class="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200">About</button>
            <button @click="smoothScroll('contact'); mobileMenuOpen = false" class="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200">Contact</button>
            
            <!-- Mobile Authentication Links -->
            <div class="border-t pt-2 mt-2">
              <a href="http://localhost:8000/login" class="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium transition-colors duration-200">
                Login
              </a>
              <a href="http://localhost:8000/register" class="block bg-gradient-to-r from-gray-600 to-gray-700 text-white px-3 py-2 rounded-lg text-base font-medium hover:shadow-lg transition-all duration-300 mt-2">
                Register
              </a>
            </div>
            
            <div class="pt-2">
              <a href="/admin/dashboard" class="block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-center font-medium hover:shadow-lg transition-all duration-300">
                Patient Portal
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Medical Hero Background -->
      <div class="absolute inset-0 hero-background">
        <!-- Gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-blue-800/75 to-teal-700/80 z-10"></div>
        
        <!-- Medical pattern overlay -->
        <div class="absolute inset-0 z-5 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="medical-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="white" opacity="0.3"/>
                <path d="M50 30 L50 70 M30 50 L70 50" stroke="white" stroke-width="3" opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#medical-pattern)" />
          </svg>
        </div>

        <!-- Animated medical elements -->
        <div class="absolute inset-0 z-5">
          <div class="floating-element absolute top-1/4 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-bounce"></div>
          <div class="floating-element absolute top-3/4 right-1/4 w-12 h-12 bg-teal-300/20 rounded-full animate-pulse"></div>
          <div class="floating-element absolute bottom-1/3 left-1/3 w-8 h-8 bg-blue-300/20 rounded-full animate-ping"></div>
        </div>

        <!-- Hero medical image (simulated with CSS gradient and shapes) -->
        <div class="absolute inset-0 hero-medical-bg">
          <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-3/4 opacity-20">
            <!-- Medical cross shape -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-32 h-4 bg-white rounded-full"></div>
              <div class="absolute w-4 h-32 bg-white rounded-full"></div>
            </div>
            <!-- Stethoscope shape -->
            <div class="absolute bottom-10 right-20">
              <div class="w-20 h-20 border-4 border-white rounded-full opacity-60"></div>
              <div class="w-2 h-16 bg-white absolute top-20 left-9 opacity-60"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Hero content -->
      <div class="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="hero-content animate-on-scroll">
          <h1 class="hero-title text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            <span class="hero-text-1 block">Your Health,</span>
            <span class="hero-text-2 block bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent">Our Priority</span>
          </h1>
          
          <p class="hero-subtitle text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience world-class medical care with our team of dedicated professionals. 
            Advanced technology meets compassionate care for your complete wellness.
          </p>

          <div class="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <router-link to="/calendar" class="hero-cta-primary group bg-gradient-to-r from-teal-500 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:from-teal-400 hover:to-blue-400">
              <span class="mr-2">Schedule Appointment</span>
              <svg class="w-5 h-5 inline-block group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </router-link>
            
            <button @click="smoothScroll('services')" class="hero-cta-secondary group bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <span class="mr-2">Our Services</span>
              <svg class="w-5 h-5 inline-block group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
              </svg>
            </button>
          </div>

          <!-- Trust indicators -->
          <div class="hero-trust flex flex-wrap justify-center items-center gap-8 text-blue-200">
            <div class="trust-item flex items-center space-x-2">
              <svg class="w-6 h-6 text-teal-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>24/7 Emergency Care</span>
            </div>
            <div class="trust-item flex items-center space-x-2">
              <svg class="w-6 h-6 text-teal-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>Board Certified Doctors</span>
            </div>
            <div class="trust-item flex items-center space-x-2">
              <svg class="w-6 h-6 text-teal-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>Insurance Accepted</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div class="scroll-indicator animate-bounce cursor-pointer" @click="smoothScroll('services')">
          <svg class="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section animate-on-scroll bg-white py-16 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-50 to-teal-50 opacity-50"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="stat-item text-center group">
            <div class="stat-number text-4xl md:text-5xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">
              {{ stat.number }}{{ stat.suffix }}
            </div>
            <div class="stat-label text-gray-600 font-medium">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 animate-on-scroll">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Medical <span class="text-blue-600">Services</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive healthcare services delivered by experienced professionals using state-of-the-art technology
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(service, index) in services" :key="service.title" 
            class="service-card animate-on-scroll group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            @mouseenter="activeService = index"
            @mouseleave="activeService = null"
            :class="{ 'scale-105': activeService === index }">
            
            <div class="service-icon mb-6">
              <div :class="`w-16 h-16 bg-${service.color}-100 rounded-xl flex items-center justify-center group-hover:bg-${service.color}-200 transition-colors duration-300`">
                <svg :class="`w-8 h-8 text-${service.color}-600`" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="service.icon"/>
                </svg>
              </div>
            </div>
            
            <h3 class="service-title text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
              {{ service.title }}
            </h3>
            
            <p class="service-description text-gray-600 leading-relaxed">
              {{ service.description }}
            </p>

            <div class="service-action mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <router-link to="/calendar" class="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
                Book Appointment →
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div class="animate-on-scroll">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Excellence in <span class="text-blue-600">Healthcare</span>
            </h2>
            <p class="text-lg text-gray-600 mb-8 leading-relaxed">
              For over two decades, CloudIA Medical Center has been at the forefront of medical innovation, 
              providing exceptional healthcare services to our community. Our commitment to excellence, 
              combined with cutting-edge technology and compassionate care, makes us the trusted choice 
              for thousands of patients.
            </p>
            
            <div class="space-y-6">
              <div v-for="feature in aboutFeatures" :key="feature.title" class="about-feature flex items-start space-x-4 group">
                <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                  <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {{ feature.title }}
                  </h3>
                  <p class="text-gray-600">{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="animate-on-scroll relative">
            <div class="bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl p-8 relative overflow-hidden">
              <!-- Medical illustration -->
              <div class="relative z-10">
                <div class="grid grid-cols-2 gap-4 mb-6">
                  <div class="bg-white rounded-lg p-4 shadow-sm">
                    <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                      <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                        <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <h4 class="font-semibold text-gray-900">Comprehensive Exams</h4>
                  </div>
                  <div class="bg-white rounded-lg p-4 shadow-sm">
                    <div class="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center mb-3">
                      <svg class="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <h4 class="font-semibold text-gray-900">Preventive Care</h4>
                  </div>
                </div>
                
                <div class="bg-white rounded-lg p-6 shadow-sm">
                  <div class="flex items-center justify-between mb-4">
                    <h4 class="font-semibold text-gray-900">Patient Satisfaction</h4>
                    <span class="text-2xl font-bold text-blue-600">98%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full" style="width: 98%"></div>
                  </div>
                </div>
              </div>
              
              <!-- Background decoration -->
              <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-teal-200 rounded-full opacity-50 -mr-16 -mt-16"></div>
              <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-200 to-blue-200 rounded-full opacity-50 -ml-12 -mb-12"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 animate-on-scroll">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in <span class="text-blue-600">Touch</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to experience exceptional healthcare? Contact us today to schedule your appointment or learn more about our services.
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-16">
          <div class="animate-on-scroll">
            <div class="bg-white rounded-2xl p-8 shadow-lg">
              <h3 class="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              
              <div class="space-y-6">
                <div class="contact-item flex items-start space-x-4 group">
                  <div class="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">Address</h4>
                    <p class="text-gray-600">123 Medical Center Drive<br>Healthcare City, HC 12345</p>
                  </div>
                </div>

                <div class="contact-item flex items-start space-x-4 group">
                  <div class="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center group-hover:bg-teal-200 transition-colors duration-300">
                    <svg class="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">Phone</h4>
                    <p class="text-gray-600">(555) 123-4567<br>Emergency: (555) 987-6543</p>
                  </div>
                </div>

                <div class="contact-item flex items-start space-x-4 group">
                  <div class="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">Email</h4>
                    <p class="text-gray-600">info@cloudiamedical.com<br>appointments@cloudiamedical.com</p>
                  </div>
                </div>

                <div class="contact-item flex items-start space-x-4 group">
                  <div class="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">Hours</h4>
                    <p class="text-gray-600">
                      Mon-Fri: 8:00 AM - 6:00 PM<br>
                      Sat: 9:00 AM - 2:00 PM<br>
                      Sun: Emergency Only
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="animate-on-scroll">
            <div class="bg-white rounded-2xl p-8 shadow-lg">
              <h3 class="text-2xl font-bold text-gray-900 mb-6">Quick Appointment Request</h3>
              
              <form @submit.prevent="submitContactForm" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="form-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input v-model="contactForm.firstName" type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" placeholder="John" required>
                  </div>
                  <div class="form-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input v-model="contactForm.lastName" type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" placeholder="Doe" required>
                  </div>
                </div>

                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input v-model="contactForm.email" type="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" placeholder="john@example.com" required>
                </div>

                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input v-model="contactForm.phone" type="tel" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" placeholder="(555) 123-4567" required>
                </div>

                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Service</label>
                  <select v-model="contactForm.service" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                    <option value="">Select a service...</option>
                    <option>General Medicine</option>
                    <option>Cardiology</option>
                    <option>Emergency Care</option>
                    <option>Specialized Care</option>
                    <option>Other</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea v-model="contactForm.message" rows="4" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" placeholder="Please describe your health concern or appointment preference..." required></textarea>
                </div>

                <button type="submit" class="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-teal-600">
                  Send Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          <div class="md:col-span-2">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                </svg>
              </div>
              <span class="text-2xl font-bold">CloudIA Medical</span>
            </div>
            <p class="text-gray-300 mb-6 max-w-md">
              Dedicated to providing exceptional healthcare services with compassion, innovation, and excellence. Your health is our priority.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.566-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
            <ul class="space-y-2">
              <li><button @click="smoothScroll('services')" class="text-gray-300 hover:text-white transition-colors duration-200">Our Services</button></li>
              <li><button @click="smoothScroll('about')" class="text-gray-300 hover:text-white transition-colors duration-200">About Us</button></li>
              <li><router-link to="/calendar" class="text-gray-300 hover:text-white transition-colors duration-200">Book Appointment</router-link></li>
              <li><button @click="smoothScroll('contact')" class="text-gray-300 hover:text-white transition-colors duration-200">Contact Us</button></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold mb-4">Emergency</h4>
            <p class="text-gray-300 mb-2">24/7 Emergency Care</p>
            <p class="text-2xl font-bold text-red-400">(555) 987-6543</p>
            <p class="text-sm text-gray-400 mt-2">For life-threatening emergencies, call 911</p>
          </div>
        </div>
        
        <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div class="text-gray-400 text-sm">
            <p>© 2024 CloudIA Medical Center. All rights reserved.</p>
            <p class="mt-1">
              Created by <a href="https://cloudia.co.za" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 transition-colors duration-200">CloudIA - One-stop Digital Solutions Agency</a>
            </p>
          </div>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors duration-200">Privacy Policy</a>
            <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors duration-200">Terms of Service</a>
            <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors duration-200">HIPAA Notice</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

// Document title
document.title = "CloudIA Medical Center - Quality Healthcare You Can Trust"

// Reactive state for animations and interactivity
const isLoaded = ref(false)
const mobileMenuOpen = ref(false)
const activeService = ref(null)
const scrollY = ref(0)

// Stats data
const stats = ref([
  { number: 0, target: 20, suffix: '+', label: 'Years of Experience' },
  { number: 0, target: 15, suffix: '', label: 'Medical Specialists' },
  { number: 0, target: 10000, suffix: '+', label: 'Patients Served' },
  { number: 0, target: 24, suffix: '/7', label: 'Emergency Care' }
])

// Services data
const services = ref([
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    title: 'General Medicine',
    description: 'Comprehensive primary care services for all ages, including preventive care, health screenings, and chronic disease management.',
    color: 'blue'
  },
  {
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    title: 'Cardiology',
    description: 'Advanced heart care including diagnostic testing, treatment planning, and ongoing cardiac health monitoring.',
    color: 'red'
  },
  {
    icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707',
    title: 'Emergency Care',
    description: '24/7 emergency medical services with rapid response team and advanced life support capabilities.',
    color: 'yellow'
  },
  {
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
    title: 'Specialized Care',
    description: 'Expert specialists in various medical fields providing targeted treatment and advanced procedures.',
    color: 'green'
  },
  {
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    title: 'Laboratory Services',
    description: 'Complete diagnostic testing with rapid results and comprehensive analysis for accurate diagnosis.',
    color: 'purple'
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'Imaging Services',
    description: 'Advanced medical imaging including X-ray, MRI, CT scans, and ultrasound with expert radiological interpretation.',
    color: 'indigo'
  }
])

// About features data
const aboutFeatures = ref([
  { title: 'Expert Medical Team', description: 'Board-certified physicians and specialists with decades of combined experience' },
  { title: 'Advanced Technology', description: 'State-of-the-art medical equipment and innovative treatment approaches' },
  { title: 'Patient-Centered Care', description: 'Personalized treatment plans focused on your individual health needs' }
])

// Contact form
const contactForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  service: '',
  message: ''
})

// Smooth scroll function
const smoothScroll = (elementId) => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

// Counter animation function
const animateCounter = (stat) => {
  const duration = 2000
  const steps = 60
  const increment = stat.target / steps
  const stepTime = duration / steps
  
  let current = 0
  const timer = setInterval(() => {
    current += increment
    if (current >= stat.target) {
      stat.number = stat.target
      clearInterval(timer)
    } else {
      stat.number = Math.floor(current)
    }
  }, stepTime)
}

// Intersection Observer for animations
const observeElements = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
        
        // Animate counters when stats section is visible
        if (entry.target.classList.contains('stats-section')) {
          stats.value.forEach(stat => animateCounter(stat))
        }
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })
  
  // Observe all animated elements
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el)
  })
}

// Handle scroll events for parallax and navbar
const handleScroll = () => {
  scrollY.value = window.scrollY
  
  // Update navbar background
  const navbar = document.querySelector('.navbar')
  if (navbar) {
    if (scrollY.value > 100) {
      navbar.classList.add('navbar-scrolled')
    } else {
      navbar.classList.remove('navbar-scrolled')
    }
  }
}

// Submit contact form
const submitContactForm = () => {
  // Here you would typically send the form data to your backend
  console.log('Contact form submitted:', contactForm.value)
  alert('Thank you for your message! We will get back to you soon.')
  
  // Reset form
  contactForm.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  }
}

onMounted(async () => {
  await nextTick()
  isLoaded.value = true
  observeElements()
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll)
  
  // Cleanup
  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped>
/* Page Loading Animation */
.page-loaded {
  animation: pageLoad 1s ease-out;
}

@keyframes pageLoad {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Navbar Animations */
.navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);
}

.navbar-scrolled {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.logo-container {
  animation: logoFloat 3s ease-in-out infinite;
}

@keyframes logoFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

.medical-logo {
  animation: pulse 2s ease-in-out infinite;
}

/* Mobile Menu Animation */
.mobile-menu {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.mobile-menu-open {
  max-height: 300px;
  opacity: 1;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f766e 100%);
}

.hero-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="%23ffffff" fill-opacity="0.03"><circle cx="20" cy="20" r="2"/></g></svg>');
  z-index: 5;
}

.hero-title {
  animation: heroTitleSlide 1.2s ease-out 0.3s both;
}

.hero-text-1 {
  animation: slideInLeft 1s ease-out 0.5s both;
}

.hero-text-2 {
  animation: slideInRight 1s ease-out 0.7s both;
}

.hero-subtitle {
  animation: fadeInUp 1s ease-out 0.9s both;
}

.hero-buttons {
  animation: fadeInUp 1s ease-out 1.1s both;
}

.hero-trust {
  animation: fadeInUp 1s ease-out 1.3s both;
}

@keyframes heroTitleSlide {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Floating Elements */
.floating-element {
  animation: float 6s ease-in-out infinite;
}

.floating-element:nth-child(1) {
  animation-delay: 0s;
}

.floating-element:nth-child(2) {
  animation-delay: 2s;
}

.floating-element:nth-child(3) {
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Scroll Animations */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
}

.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Service Cards */
.service-card {
  transform-origin: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.service-card:hover {
  transform: translateY(-8px) scale(1.02);
}

.service-icon {
  transition: all 0.3s ease;
}

.service-card:hover .service-icon {
  transform: scale(1.1) rotate(5deg);
}

/* Stats Animation */
.stat-item {
  transition: all 0.3s ease;
}

.stat-number {
  font-variant-numeric: tabular-nums;
  transition: all 0.3s ease;
}

/* Form Styling */
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  transform: translateY(-2px);
}

/* Contact Items */
.contact-item:hover {
  transform: translateX(5px);
}

/* Trust Items */
.trust-item {
  animation: fadeInScale 0.8s ease-out;
}

.trust-item:nth-child(1) { animation-delay: 0.1s; }
.trust-item:nth-child(2) { animation-delay: 0.2s; }
.trust-item:nth-child(3) { animation-delay: 0.3s; }

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
    line-height: 1.2;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Performance optimizations */
.animate-bounce,
.animate-pulse,
.animate-ping {
  animation-play-state: running;
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>