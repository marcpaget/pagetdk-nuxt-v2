<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()

const signOut = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}
</script>

<template>
  <div class="flex min-h-screen flex-col items-center bg-base-200 p-8">
    <div class="card w-full max-w-3xl bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl font-bold">Profile</h2>
        
        <div class="mt-6">
          <div class="avatar placeholder mb-6 flex justify-center">
            <div class="bg-neutral text-neutral-content w-24 rounded-full">
              <span class="text-2xl">{{ user?.email?.charAt(0).toUpperCase() }}</span>
            </div>
          </div>
          
          <div class="mb-6 text-center">
            <h3 class="text-xl font-semibold">{{ user?.email }}</h3>
            <p class="text-base-content/70">User ID: {{ user?.id }}</p>
            <p class="text-base-content/70">Last sign in: {{ new Date(user?.last_sign_in_at).toLocaleString() }}</p>
          </div>
        </div>
        
        <div class="card-actions mt-4 justify-center">
          <button @click="signOut" class="btn btn-primary">
            Sign out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>