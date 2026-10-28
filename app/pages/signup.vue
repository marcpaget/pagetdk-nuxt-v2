<script setup lang="ts">
const user = useSupabaseUser()
const router = useRouter()
const route = useRoute()
const redirectPath = useCookie('redirect_after_auth', { default: () => '/' })

onMounted(() => {
  // Redirect if user is already signed in
  if (user.value) {
    router.push(redirectPath.value || '/')
  }
})

// Store the referrer for redirect after successful signup
const from = route.query.from as string
if (from && from !== '/login' && from !== '/signup') {
  redirectPath.value = from
}
</script>

<template>	
  <SignupComponent />
</template>