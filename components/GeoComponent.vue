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
 <UCard>
  <UCardHeader>
    <h2 class="text-lg font-semibold">Geolocation Info</h2>
  </UCardHeader>
  <UCardBody>
    <p>Speed: {{ speedkmh }} km/h</p>
    <p>Altitude: {{ altitude }} m</p>
    <p>Accuracy: {{ accuracy }} m</p>
    <p>Heading: {{ heading }}°</p>
    <p>Max Speed: {{ maxSpeed }} km/h</p>
    <p>Distance: {{ distance }} km</p>
  </UCardBody>
 </UCard>
</template>   