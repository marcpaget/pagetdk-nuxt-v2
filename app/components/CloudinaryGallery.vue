<template>
    <div class="card md:flex md:items-center">
        <Galleria
            :value="images"
            :responsive-options="responsiveOptions"
            :num-visible="5"
            container-style="max-width: 640px"
        >
            <template #item="slotProps">
                <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%" />
            </template>
            <template #thumbnail="slotProps">
                <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" />
            </template>
        </Galleria>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const images = [
    {
        itemImageSrc:
            'https://res.cloudinary.com/selfhostingninja/image/upload/v1684195448/pagetdk-nuxt/Marc_portr%C3%A6t_AROS_mty5kv.jpg',
        thumbnailImageSrc:
            'https://res.cloudinary.com/selfhostingninja/image/upload/v1684195448/pagetdk-nuxt/Marc_portr%C3%A6t_AROS_mty5kv.jpg',
        alt: 'Portrait',
    },
    {
        itemImageSrc: 'https://res.cloudinary.com/selfhostingninja/image/upload/v1684195448/pagetdk-nuxt/flower.webp',
        thumbnailImageSrc:
            'https://res.cloudinary.com/selfhostingninja/image/upload/v1684195448/pagetdk-nuxt/flower.webp',
        alt: 'Flower',
    },
    {
        itemImageSrc:
            'https://res.cloudinary.com/selfhostingninja/image/upload/v1684195448/pagetdk-nuxt/flower-cropped.webp',
        thumbnailImageSrc:
            'https://res.cloudinary.com/selfhostingninja/image/upload/v1684195448/pagetdk-nuxt/flower-cropped.webp',
        alt: 'Flower cropped',
    },
    {
        itemImageSrc: 'https://res.cloudinary.com/selfhostingninja/image/upload/v1684195448/pagetdk-nuxt/bird.jpeg',
        thumbnailImageSrc:
            'https://res.cloudinary.com/selfhostingninja/image/upload/v1684195448/pagetdk-nuxt/bird.jpeg',
        alt: 'Bird',
    },
]

const responsiveOptions = ref([
    {
        breakpoint: '991px',
        numVisible: 4,
    },
    {
        breakpoint: '767px',
        numVisible: 3,
    },
    {
        breakpoint: '575px',
        numVisible: 1,
    },
])
</script>
