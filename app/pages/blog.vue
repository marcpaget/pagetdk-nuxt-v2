<script setup lang="ts">
const { data: pages } = await useFetch('/api/content', {
  key: 'content',
})
</script>

<template>
  <div>
    <h1>Blog</h1>
    <ul>
      <li v-for="page in pages" :key="page.id">
        <NuxtLink :to="page.path">{{ page.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
