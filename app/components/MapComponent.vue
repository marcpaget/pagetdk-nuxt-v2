<script setup lang="ts">
// const mapStyle =
//   'https://api.maptiler.com/maps/streets-v2/style.json?key=MXU5h2UnWF310IfYxINH'
// const mapStyle =
// 'https://api.maptiler.com/tiles/outdoor/tiles.json?key=MXU5h2UnWF310IfYxINH'
const mapStyle =
  'https://api.maptiler.com/maps/outdoor-v4/style.json?key=MXU5h2UnWF310IfYxINH'
const center: [number, number] = [10.0, 56.0] // Copenhagen area (lng, lat)
const zoom = 10

function onGeolocate(e: unknown) {
  const coords = (e as any)?.coords ?? (e as any)?.position?.coords
  if (!coords) return
  console.log('User located at', coords.latitude, coords.longitude)
}

function onError(e: unknown) {
  console.error('Geolocate error', e)
}
</script>

<template>
  <UContainer >
    <MglMap
      :map-style="mapStyle"
      :zoom="zoom"
      :center="center"
      height="500px"
      width="500px"
    >
      <MglGeolocateControl
        position="top-right"
        :track-user-location="true"
        :show-accuracy-circle="true"
        :show-user-location="true"
        @geolocate="onGeolocate"
        @error="onError"
      />
    </MglMap>
  </UContainer>
</template>

