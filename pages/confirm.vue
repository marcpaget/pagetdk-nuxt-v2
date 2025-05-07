<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const loading = ref(true)
const router = useRouter()
const route = useRoute()

onMounted(async () => {
  // Check if we have a session
  const { data, error } = await supabase.auth.getSession()
  
  // If hash exists in the URL, handle the auth redirect
  if (route.hash && !data?.session) {
    const { error } = await supabase.auth.getSessionFromUrl()
    if (error) {
      console.error('Error getting session from URL:', error.message)
    }
  }
  
  loading.value = false
})

watch(user, () => {
  if (user.value) {
    // User is authenticated, redirect to home page
    router.push('/')
  }
}, { immediate: true })

const backToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-base-200">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body text-center">
        <div v-if="loading" class="p-8">
          <span class="loading loading-spinner loading-lg"></span>
          <p class="mt-4">Verifying your login...</p>
        </div>
        
        <div v-else>
          <h2 class="card-title justify-center mb-4">
            <svg v-if="user" xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </h2>
          
          <p v-if="user" class="text-lg mb-4">Successfully logged in!</p>
          <p v-else class="text-lg mb-4">Login link has expired or is invalid</p>
          
          <p v-if="user" class="mb-6 text-base-content/70">
            Welcome back, {{ user.email }}!
          </p>
          <p v-else class="mb-6 text-base-content/70">
            The login link may have expired or been used already.
          </p>
          
          <div class="card-actions justify-center">
            <button v-if="user" @click="router.push('/')" class="btn btn-primary">
              Continue to Home
            </button>
            <button v-else @click="backToLogin" class="btn btn-primary">
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
