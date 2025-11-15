<script setup>
const mapStyle =
  'https://api.maptiler.com/tiles/outdoor/tiles.json?key=MXU5h2UnWF310IfYxINH'
const center = [10, 56] // fallback center (lng, lat)

const zoom = 12
function onGeolocate(e) {
  // e is a GeolocateEvent from MapLibre
  const coords = e.coords ?? e.position?.coords
  if (!coords) return
  console.log(
    'User located at',
    coords.latitude,
    coords.longitude,
    '±',
    coords.accuracy,
    'm',
  )
}

function onError(e) {
  console.error('Geolocate error', e)
}
</script>

<template>
  <div class="w-full h-screen">
    <MglMap
      :style="mapStyle"
      :zoom="[12]"
      :center="center"
    >
      <MglGeolocateControl
        position="top-right"
        :trackUserLocation="true"
        :showAccuracyCircle="true"
        :showUserLocation="true"
        :positionOptions="{ enableHighAccuracy: true, timeout: 10000 }"
        @geolocate="onGeolocate"
        @error="onError"
      />
    </MglMap>
  </div>
</template>