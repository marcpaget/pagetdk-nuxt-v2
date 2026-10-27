<script setup>
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <div class="w-full h-screen">
    <ClientOnly>
      <MapComponent />
      <template #fallback>
        <div class="w-full h-screen flex items-center justify-center">
          <p class="text-lg text-gray-600">Loading map...</p>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
