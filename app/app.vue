<template>
    <UApp>
      <client-only>
        <Analytics />
      </client-only>
      <client-only>
        <SpeedInsights />
      </client-only>
      <NuxtLoadingIndicator />
      <NuxtuiNavBar />
      <NuxtPage />
  </UApp>
</template>


<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'
import { SpeedInsights } from '@vercel/speed-insights/nuxt'
</script>


