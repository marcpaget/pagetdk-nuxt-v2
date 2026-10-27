<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const user = useSupabaseUser()
const supabase = useSupabaseClient()

const signOut = async () => {
  await supabase.auth.signOut()
  await navigateTo('/login')
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen p-4">
    <UCard class="w-full max-w-md">
      <template #header>
        <h2 class="text-2xl font-bold text-center">Profile</h2>
      </template>

      <div class="space-y-6">
        <div class="flex justify-center">
          <UAvatar size="xl" :alt="user?.email || 'User'" />
        </div>

        <div class="space-y-2 text-center">
          <p class="font-semibold">{{ user?.email }}</p>
          <p class="text-sm text-gray-500">ID: {{ user?.id?.slice(0, 8) }}...</p>
        </div>

        <UButton block color="error" @click="signOut">
          Sign Out
        </UButton>
      </div>
    </UCard>
  </div>
</template>