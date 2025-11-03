<script setup lang="ts">
import { computed, ref } from 'vue'
//  Implement functionality to save the session data (e.g., speed, altitude, distance) to a database.

import { useGeolocation } from '@vueuse/core'

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
</script>

<template>
  
  <UContainer>
     <div class="p-4 justify-center items-center">
   <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
    <h2 class="text-lg font-semibold">Geolocation Info</h2>
 <div>
    <p>Speed: {{ speedkmh }} km/h</p> <UIcon name="material-symbols-light:speed-outline-rounded" class="size-10" />
    </div>
    <div> 
    <p>Altitude: {{ altitude }} m</p>  <UIcon name="material-symbols-light:altitude-outline-rounded" class="size-10" />
    </div>
    <div>
    <p>Accuracy: {{ accuracy }} m</p> <UIcon name="radix-icons:crosshair-2" class="size-10" />
    </div>
    <div>
    <p>Heading: {{ heading }}°</p> <UIcon name="lineicons:direction-alt" class="size-10" />
    </div>
    <div>
    <p>Max Speed: {{ maxSpeedkmh }} km/h</p> <UIcon name="material-symbols:performance-max-outline-sharp" class="size-10" />
    </div>
    <div>
    <p>Distance: {{ distancekm }} km</p><UIcon name="game-icons:path-distance" class="size-10" />
    </div>  
</div>
  </div>
 </UContainer>
 
</template>   
