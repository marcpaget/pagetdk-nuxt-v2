<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[]>([
  {
    label: 'Projects',
    icon: 'i-lucide-book-open',
    children: [
      {
        label: 'GeoInfo',
        description: 'Fully styled and customizable components for Nuxt.',
        icon: 'i-lucide-house',
        to: '/geoinfo'

      },
      {
        label: 'FlagQuiz',
        description: 'Learn how to install and configure Nuxt UI in your application.',
        icon: 'i-lucide-cloud-download',
        to: '/flagquiz'
      },
      {
        label: 'Gallery',
        icon: 'i-lucide-smile',
        description: 'You have nothing to do, @nuxt/icon will handle it automatically.',
        to: '/gallery'
      },
    ]
  },
  {
    label: 'CV',
    icon: 'i-lucide-database',
    children: [
      {
        label: 'About',
        icon: 'i-lucide-file-text',
        description: 'Define shortcuts for your application.',
        to: '/about'
      }
    //   {
    //     label: 'useOverlay',
    //     icon: 'i-lucide-file-text',
    //     description: 'Display a modal/slideover within your application.',
    //     to: '/composables/use-overlay'
    //   },
    //   {
    //     label: 'useToast',
    //     icon: 'i-lucide-file-text',
    //     description: 'Display a toast within your application.',
    //     to: '/composables/use-toast'
    //   }
    ]
  },
  {
    label: 'Misc',
    icon: 'i-lucide-box',
    active: true,
    children: [
      {
        label: 'Sri Lanka Timeline',
        icon: 'i-lucide-file-text',
        description: 'Use NuxtLink with superpowers.',
        to: '/srilankatimeline'
      }
    //   {
    //     label: 'Modal',
    //     icon: 'i-lucide-file-text',
    //     description: 'Display a modal within your application.',
    //     to: '/components/modal'
    //   },
    //   {
    //     label: 'NavigationMenu',
    //     icon: 'i-lucide-file-text',
    //     description: 'Display a list of links.',
    //     to: '/components/navigation-menu'
    //   },
    //   {
    //     label: 'Pagination',
    //     icon: 'i-lucide-file-text',
    //     description: 'Display a list of pages.',
    //     to: '/components/pagination'
    //   },
    //   {
    //     label: 'Popover',
    //     icon: 'i-lucide-file-text',
    //     description: 'Display a non-modal dialog that floats around a trigger element.',
    //     to: '/components/popover'
    //   },
    //   {
    //     label: 'Progress',
    //     icon: 'i-lucide-file-text',
    //     description: 'Show a horizontal bar to indicate task progression.',
    //     to: '/components/progress'
    //   }
    ]
  },
  {
    label: 'GitHub',
    icon: 'i-simple-icons-github',
    badge: '3.8k',
    to: 'https://github.com/nuxt/ui',
    target: '_blank'
  },
  {
    label: 'Help',
    icon: 'i-lucide-circle-help',
    disabled: true
  }
])
</script>

<template>
  <UNavigationMenu :items="items" class="w-full justify-center" />
</template>
