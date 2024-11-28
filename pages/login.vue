<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')

const signInWithPassword = async () => {
const { data, error } = await supabase.auth.signInWithPassword({
  email: email.value,
  password: password.value,
  })
  if (error) console.log(error)
}

</script>

<template>
  <UCard >
    <template #header>
      Sign in
    </template>
    <form @submit.prevent="signInWithPassword">
      <UFormGroup>
        <UInput
          v-model="email"
          type="email"
          placeholder="Email"
          required
        />
        <UInput
          v-model="password"
          type="password"
          placeholder="Password"
          required
        />
      </UFormGroup>
      <UButton
        type="submit"
        variant="solid"
        color="black"
      >
        Sign In
      </UButton>
    </form>
  </UCard>
</template>

