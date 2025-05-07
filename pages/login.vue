<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const loading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

const signInWithOtp = async () => {
  if (!email.value || !email.value.includes('@')) {
    errorMsg.value = 'Please enter a valid email address'
    return
  }

  loading.value = true
  errorMsg.value = ''
  successMsg.value = ''

  try {
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
      options: {
        emailRedirectTo: `${window.location.origin}/confirm`,
      }
    })
    
    if (error) {
      errorMsg.value = error.message
    } else {
      successMsg.value = 'Check your email for the login link!'
    }
  } catch (err: any) {
    errorMsg.value = err.message || 'An error occurred during sign in'
  } finally {
    loading.value = false
  }
}

// Google authentication
const signInWithGoogle = async () => {
  loading.value = true
  errorMsg.value = ''
  
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/confirm`
      }
    })
    
    if (error) {
      errorMsg.value = error.message
    }
  } catch (err: any) {
    errorMsg.value = err.message || 'An error occurred during sign in'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-base-200">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Welcome back!</h2>
        <p class="text-base-content/70">Sign in to continue to your account</p>
        
        <form @submit.prevent="signInWithOtp" class="mt-4 space-y-4">
          <div>
            <label class="label" for="email">
              <span class="label-text">Email</span>
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="Your email address"
              class="input input-bordered w-full"
              required
            />
          </div>
          
          <div v-if="errorMsg" class="alert alert-error" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ errorMsg }}</span>
          </div>
          
          <div v-if="successMsg" class="alert alert-success" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ successMsg }}</span>
          </div>
          
          <div class="card-actions justify-center">
            <button type="submit" class="btn btn-primary w-full" :class="{ 'loading': loading }" :disabled="loading">
              {{ loading ? 'Sending link...' : 'Sign in with Email' }}
            </button>
          </div>
        </form>
        
        <div class="divider">OR</div>
        
        <button @click="signInWithGoogle" class="btn btn-outline w-full" :disabled="loading">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 488 512">
            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>
