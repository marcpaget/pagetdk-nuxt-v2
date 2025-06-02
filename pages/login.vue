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
  <div class="max-w-sm mx-auto mt-10">
    <form @submit="signInWithPassword">
      <input
        v-model="email"
        type="email"
        placeholder="Enter your email"
        required
        autofocus
        class="input input-bordered w-full mb-4"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Enter your password"
        required
        autocomplete="current-password"
        class="input input-bordered w-full mb-4"
      />
      <button class="btn btn-primary w-full mt-4" type="submit">
        Sign In with E-Mail
      </button>
    </form>
  </div>
</template>
