<script setup lang="ts">
const nuxtApp = useNuxtApp()
const toast = useToast()

watch(
  () => nuxtApp.$pwa?.needRefresh,
  (needRefresh) => {
    if (!needRefresh) return
    toast.add({
      title: 'Update available',
      description: 'A new version of this site is ready.',
      color: 'primary',
      actions: [
        {
          label: 'Reload',
          onClick: () => nuxtApp.$pwa?.updateServiceWorker(true),
        },
      ],
    })
  },
)
</script>

<template />
