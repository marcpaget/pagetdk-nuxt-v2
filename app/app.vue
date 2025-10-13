<!-- <template>
   <NuxtLayout>
    <div>
     
      <NuxtLoadingIndicator />
      <DaisyNavbar />
      <NuxtPage />
      
    </div>
  </NuxtLayout>
</template> -->
<template>
    <UApp>
      <Analytics />
      <SpeedInsights />
    <NuxtLoadingIndicator />
      <NuxtuiNavBar />
      <NuxtPage />
  </UApp>
</template>

<script setup>
import { Analytics } from '@vercel/analytics/nuxt'
import { SpeedInsights } from '@vercel/speed-insights/nuxt'
</script>