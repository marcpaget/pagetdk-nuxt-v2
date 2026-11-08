
<template>
    <div class="card">
        <MegaMenu :model="items" />
    </div>
</template>

<script setup>
import { ref } from "vue";

const items = ref([
    {
        label: 'Projects',
        icon: 'pi pi-box',
        items: [
            [
                {
                    label: 'MOC',
                    items: [{ label: 'Moc', route: '/login' }, { label: 'Github Status', route: '/login' }]
                }
            ],
            
            [
                {
                    label: 'Office',
                    items: [{ label: 'Bookcase' }, { label: 'Cabinet' }, { label: 'Chair' }, { label: 'Desk' }, { label: 'Executive Chair' }]
                }
            ]
        ]
    },
    {
        label: 'Games',
        icon: 'pi pi-mobile',
        items: [
            [
                {
                    label: 'Flagquiz',
                    items: [{ label: 'Monitor' }, { label: 'Mouse' }, { label: 'Notebook' }, { label: 'Keyboard' }, { label: 'Printer' }, { label: 'Storage' }]
                }
            ],
            [
                {
                    label: 'Home Theater',
                    items: [{ label: 'Projector' }, { label: 'Speakers' }, { label: 'TVs' }]
                }
            ],
            [
                {
                    label: 'Gaming',
                    items: [{ label: 'Accessories' }, { label: 'Console' }, { label: 'PC' }, { label: 'Video Games' }]
                }
            ],
            [
                {
                    label: 'Appliances',
                    items: [{ label: 'Coffee Machine' }, { label: 'Fridge' }, { label: 'Oven' }, { label: 'Vaccum Cleaner' }, { label: 'Washing Machine' }]
                }
            ]
        ]
    },
    {
        label: 'Sports',
        icon: 'pi pi-clock',
        items: [
            [
                {
                    label: 'Football',
                    items: [{ label: 'Kits' }, { label: 'Shoes' }, { label: 'Shorts' }, { label: 'Training' }]
                }
            ],
            [
                {
                    label: 'Running',
                    items: [{ label: 'Accessories' }, { label: 'Shoes' }, { label: 'T-Shirts' }, { label: 'Shorts' }]
                }
            ],
            [
                {
                    label: 'Swimming',
                    items: [{ label: 'Kickboard' }, { label: 'Nose Clip' }, { label: 'Swimsuits' }, { label: 'Paddles' }]
                }
            ],
            [
                {
                    label: 'Tennis',
                    items: [{ label: 'Balls' }, { label: 'Rackets' }, { label: 'Shoes' }, { label: 'Training' }]
                }
            ]
        ]
    }
]);
</script>
