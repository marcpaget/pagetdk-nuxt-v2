<template>
    <p>Gallery page is under construction. Please check back later.</p>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>


<!-- // <template>
//     <div class="card">
//         <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" :circular="true" containerStyle="max-width: 640px" :showItemNavigators="true" :showItemNavigatorsOnHover="true">
//             <template #item="slotProps">
//                 <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
//             </template>
//             <template #thumbnail="slotProps">
//                 <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="display: block" />
//             </template>
//         </Galleria>
//     </div>
// </template> -->
<!-- 
//  /*
// <script setup>
// import { ref, onMounted } from "vue";
// import { PhotoService } from '@/service/PhotoService';

// onMounted(() => {
//     PhotoService.getImages().then((data) => (images.value = data));
// });

// cloudinary
// SriLanka

// const img = useImage()
// const photos = computed(() => {
//   const photourl = img('https://github.com/nuxt.png', { width: 100 })
//   return { photos: `url('${photourl}')` }
// })





// const images = ref();
// const responsiveOptions = ref([
//     {
//         breakpoint: '1300px',
//         numVisible: 4
//     },
//     {
//         breakpoint: '575px',
//         numVisible: 1
//     }
// ]);
// </script> 
// */ -->