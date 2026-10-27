<template>
    <div class="card">
        <Menubar :model="items">
            <template #item="{ item, props, hasSubmenu }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                        <span :class="item.icon" />
                        <span>{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                    <span :class="item.icon" />
                    <span>{{ item.label }}</span>
                    <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
                </a>
            </template>
        </Menubar>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();

const items = ref([
    {
        label: 'Projects',
        icon: 'pi pi-palette',
        items: [
            {
                label: 'Github Projects',
                route: '/'
            },
            {
                label: 'Geoinfo',
                route: '/geoinfo'
            },
            {
                label: 'Gallery',
                route: '/gallery'
            }
        ]
    },
    {
        label: 'Games',
        icon: 'pi pi-palette',
        items: [
            {
                label: 'Flagquiz',
                route: '/flagquiz'
            }
            // {
            //     label: 'Unstyled',
            //     route: '/theming/unstyled'
            // }
        ]
    },
  
]);
</script>
