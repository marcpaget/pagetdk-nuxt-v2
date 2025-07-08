<script setup lang="ts">
useSeoMeta({
  title: 'Welcome to Paget.dk',
  description: 'Explore our projects, tools, and services'
})
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <!-- Hero Section -->
    <div class="hero min-h-screen bg-gradient-to-br from-primary to-secondary">
      <div class="hero-content text-center text-primary-content">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold mb-5">Welcome to Paget.dk</h1>
          <p class="mb-5">
            Discover our collection of interactive projects, tools, and applications built with modern web technologies.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/flagquiz" class="btn btn-accent btn-lg">
              Try Flag Quiz
            </NuxtLink>
            <NuxtLink to="/geoinfo" class="btn btn-outline btn-accent btn-lg">
              Explore GeoInfo
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-20 bg-base-200">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Featured Projects</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h3 class="card-title">
                <Icon name="lucide:map" class="w-6 h-6" />
                GeoInfo
              </h3>
              <p>Real-time geolocation tracking with speed, altitude, and distance measurements.</p>
              <div class="card-actions justify-end">
                <NuxtLink to="/geoinfo" class="btn btn-primary">Try It</NuxtLink>
              </div>
            </div>
          </div>

          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h3 class="card-title">
                <Icon name="lucide:flag" class="w-6 h-6" />
                Flag Quiz
              </h3>
              <p>Test your knowledge of world flags in this interactive quiz game.</p>
              <div class="card-actions justify-end">
                <NuxtLink to="/flagquiz" class="btn btn-primary">Play Now</NuxtLink>
              </div>
            </div>
          </div>

          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h3 class="card-title">
                <Icon name="lucide:images" class="w-6 h-6" />
                Gallery
              </h3>
              <p>Browse through our collection of images and memories.</p>
              <div class="card-actions justify-end">
                <NuxtLink to="/gallery" class="btn btn-primary">View Gallery</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- About Section -->
    <div class="py-20 bg-base-100">
      <div class="container mx-auto px-4 text-center">
        <div class="max-w-2xl mx-auto">
          <h2 class="text-3xl font-bold mb-8">About This Project</h2>
          <p class="text-lg mb-8">
            This is a showcase of modern web development using Nuxt.js, Vue.js, and daisyUI. 
            Built with TypeScript, Supabase authentication, and various integrations.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <div class="badge badge-primary badge-lg">Nuxt.js</div>
            <div class="badge badge-secondary badge-lg">Vue.js</div>
            <div class="badge badge-accent badge-lg">TypeScript</div>
            <div class="badge badge-info badge-lg">Supabase</div>
            <div class="badge badge-success badge-lg">daisyUI</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>