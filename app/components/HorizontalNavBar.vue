<script setup lang="ts">
const links = [{
  label: 'Geoinfo',
  icon: 'i-heroicons-home',
  to: '/geoinfo'
}, {
  label: 'Projects',
  icon: 'i-heroicons-chart-bar'
},  {
  label: 'Flagquiz',
  to: '/flagquiz'
}, 
{
label: 'Products',
children:[{
        label: 'Electronics',
        children: [
          { label: 'Laptops', to: '/geoinfo' },
          { label: 'Smartphones', to: '/geoinfo' }
        ]
      },
      {
        label: 'Clothing',
        children: [
          { label: 'Men', to: '/geoinfo' },
          { label: 'Women', to: '/geoinfo' }
        ]
      }
    ]
  },
{
  label: 'Login',
  icon: 'i-heroicons-command-line',
  to: '/login'
}]
</script>

<template>
  <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800 active:border-green-500 dark:active:border-green-800" />
</template>

