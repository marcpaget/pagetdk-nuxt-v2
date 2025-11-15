<template>
  <p class="mb-10">
    Github projekter
  </p>
  <section v-if="pending">
    Loading...
  </section>
  <section v-else-if="error">
    Error. Try again
  </section>
  <section v-else>
    <ul class="grid grid-cols-1 gap-4">
      <li
        v-for="repository in data"
        :key="repository.id"
        class="border border-gray-200 rounded-sm p-4 hover:bg-gray-100 font-mono"
      >
        <a
          :href="repository.html_url"
          target="_blank"
        >
          <div class="flex items-center justify-between text-sm">
            <div class="font-semibold">{{ repository.name }}</div>
          </div>
          <p class="text-sm">{{ repository.description }}</p>
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
})
const { error, pending, data } = await useFetch(
  'https://api.github.com/users/marcpaget/repos',
)
</script>
