<script setup lang="ts">
import { computed, ref } from 'vue'
//  Implement functionality to save the session data (e.g., speed, altitude, distance) to a database.

import { useGeolocation } from '@vueuse/core'
import { title } from 'valibot'

// const options = {
//     enableHighAccuracy: true,
//     timeout: 5000,
//     maximumAge: 0,
// }
// Lav chart over hastighed, højde, distance, max hastighed, tid, heading,
// accuracy i Plotly/Chart.js eller lign. evt. vha. PrimeVue eller DaisyUI.
// Opsæt en knap til at starte og stoppe målingerne.
// Lav mulighed for at generere pdf med info fra sessionen.
// Lav mulighed for at gemme sessionen i en database.
// Lav mulighed for at se tidligere sessioner.
// Lav mulighed for holde skærm tændt under sessionen.
// Fix UI

const { coords, locatedAt, error, resume, pause } = useGeolocation()
const speedkmh = computed(() => {
  if (coords.value.speed) {
    return (coords.value.speed * 3.6).toFixed(2)
  }
  return 0
})
const altitude = computed(() => {
  if (coords.value.altitude) {
    return coords.value.altitude.toFixed(2)
  }
  return 0
})
const accurateAltitude = computed(() => {
  if (coords.value.altitude) {
    return coords.value.altitude.toFixed(2)
  }
  return 0
})
const accuracy = computed(() => {
  if (coords.value.accuracy) {
    return coords.value.accuracy.toFixed(2)
  }
  return 0
})
const heading = computed(() => {
  if (coords.value.heading) {
    return coords.value.heading.toFixed(2)
  }
  return 0
})

// create a function to show maximum speed in km/h during the session
let maxSpeed = 0
const maxSpeedkmh = computed(() => {
  if (coords.value.speed) {
    if (coords.value.speed > maxSpeed) {
      maxSpeed = coords.value.speed
    }
    return (maxSpeed * 3.6).toFixed(2)
  }
  return 0
})

// create function to show how many kilometers have been traveled during the session
let distance = 0
const distancekm = computed(() => {
  if (coords.value.speed) {
    distance = distance + coords.value.speed
    return (distance / 1000).toFixed(2)
  }
  return 0
})
const cards = computed(() => [
  {
    title: coords.value.latitude?.toFixed(6) || 'N/A',
    description: 'Latitude',
    icon: 'lucide:navigation',
  },
  {
    title: coords.value?.longitude?.toFixed(6) || 'N/A',
    description: 'Longitude',
    icon: 'lucide:map-pin',
  },
  {
    title: coords.value?.speed
      ? `${(coords.value.speed * 3.6).toFixed(2)} km/h`
      : 'N/A',
    description: 'Speed',
    icon: 'lucide:gauge',
  },
  {
    title: coords.value?.altitude?.toFixed(2) || 'N/A',
    description: 'Altitude',
    icon: 'lucide:mountain',
  },
  {
    title: coords.value?.heading?.toFixed(2) || 'N/A',
    description: 'Heading',
    icon: 'lucide:compass',
  },
  {
    title: `${coords.value?.heading?.toFixed(2)}°` || 'N/A',
    description: 'Heading',
    icon: 'lucide:compass',
  },
  {
    title: coords.value?.accuracy?.toFixed(2) || 'N/A',
    description: 'Accuracy',
    icon: 'radix-icons:crosshair-2',
  },
])
</script>

<template>
  

  <UContainer>
     <div class="p-4 justify-center items-center self-center">
        <h2 class="text-lg font-semibold text-center">Geolocation Info</h2>
   <div class="grid grid-cols-2 gap-4 items-center justify-center text-center ">
    <UPageGrid>
    <UPageCard
      v-for="(card, index) in cards"
      :key="index"
      v-bind="card"
    />
  </UPageGrid>
</div>
  </div>
 </UContainer>
 
</template>   
