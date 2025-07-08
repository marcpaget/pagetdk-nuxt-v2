<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const router = useRouter()
const loginError = ref('')

const signInWithPassword = async (e: Event) => {
  e.preventDefault()
  loginError.value = ''
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  if (error || !data.user) {
    loginError.value = error?.message || 'Login failed. Please check your credentials.'
    return
  }
  // Redirect to confirm page after successful login
  await router.push({ path: '/confirm', query: { redirect: router.currentRoute.value.fullPath } })
}
</script>
<template>
  <div class="max-w-sm mx-auto mt-10">
    <form @submit.prevent="signInWithPassword">
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
      <div v-if="loginError" class="alert alert-error mt-4">{{ loginError }}</div>
    </form>
  </div>
</template>
