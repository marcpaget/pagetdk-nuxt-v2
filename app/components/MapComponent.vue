<script setup>
const mapStyle =
  'https://api.maptiler.com/tiles/outdoor/tiles.json?key=MXU5h2UnWF310IfYxINH'
const center = [10, 56] // fallback center (lng, lat)

const zoom = 12
const height = '500px'
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
  <div class="map-container">
    <MglMap
      :map-style="mapStyle"
      :zoom="zoom"
      :center="center"
      :height="height"
    >
      <MglGeolocateControl
        position="top-right"
        :track-user-location="true"
        :show-accuracy-circle="true"
        :show-user-location="true"
        :position-options="{ enableHighAccuracy: true, timeout: 10000 }"
        @geolocate="onGeolocate"
        @error="onError"
      />
    </MglMap>
  </div>
</template>

<style scoped>
.map-container {
  width: 100%;
  height: 100vh;
}

.map-container :deep(.maplibregl-map) {
  width: 100%;
  height: 100%;
}
</style>