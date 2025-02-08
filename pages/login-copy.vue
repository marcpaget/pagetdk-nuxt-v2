<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')

const signInWithEmail = async () => {
const { data, error } = await supabase.auth.signInWithPassword({
  email: email.value,
  password: password.value,
  })
  if (error) console.log(error)
}

// const signInWithGithub = async () => {
// const { data, error } = await supabase.auth.signInWithPassword({
//   email: email.value,
//   password: password.value,
//   })
//   if (error) console.log(error)
// }

</script>

<template>
  <div>
  <UCard class="h-4 w-1/4 justify-self-center mt-16" >
    <form @submit.prevent="signInWithEmail">
      <UFormGroup class="mt-1 mb-1">
        <UInput
          v-model="email"
          type="email"
          placeholder="Email"
          required
        />
        <UInput class="mt-3"
          v-model="password"
          type="password"
          placeholder="Password"
          required
        />
      </UFormGroup>
      <UButton class="mt-3 justify-center"
        type="submit"
        variant="solid"
        color="black"
      >
        Sign In
      </UButton>
    </form>
  </UCard>
</div>
</template>
