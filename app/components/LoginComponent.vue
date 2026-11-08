<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const supabase = useSupabaseClient()
const toast = useToast()

const fields = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  },
]

const providers = [
  {
    label: 'Continue with Google',
    icon: 'i-simple-icons-google',
    color: 'primary' as const,
  },
  {
    label: 'Continue with GitHub',
    icon: 'i-simple-icons-github',
    color: 'neutral' as const,
  },
]

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Must be at least 6 characters'),
})

type Schema = z.output<typeof schema>

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    if (!supabase) {
      toast.add({
        title: 'Client Error',
        description: 'Supabase client not available',
        color: 'error',
      })
      return
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: event.data.email,
      password: event.data.password,
    })

    // Debug info: log raw response when things go wrong
    // eslint-disable-next-line no-console
    console.debug('supabase.signInWithPassword ->', { data, error })

    if (error) {
      toast.add({
        title: 'Login Failed',
        description: error.message || 'Unknown error',
        color: 'error',
      })
      return
    }

    // Handle success when either user or session is present
    if (data && (data.user || data.session)) {
      toast.add({
        title: 'Welcome back!',
        description: 'You have been logged in successfully',
        color: 'success',
      })
      await navigateTo('/profile')
      return
    }

    // Fallback: no error but also no session/user
    toast.add({
      title: 'Login',
      description: 'No session created. Check credentials or server logs.',
      color: 'warning',
    })
  } catch (err: unknown) {
    // eslint-disable-next-line no-console
    console.error('Login error', err)
    const msg = err instanceof Error ? err.message : String(err)
    toast.add({ title: 'Login Error', description: msg, color: 'error' })
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen p-4">
    <UCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        :fields="fields"
        :providers="providers"
        title="Welcome back!"
        icon="i-heroicons-lock-closed"
        @submit="onSubmit"
      >
        <template #description>
          Don't have an account?
          <NuxtLink to="/signup" class="text-primary font-medium">Sign up</NuxtLink>.
        </template>
        <template #footer>
          By signing in, you agree to our
          <NuxtLink to="#" class="text-primary font-medium">Terms of Service</NuxtLink>.
        </template>
      </UAuthForm>
    </UCard>
  </div>
</template>
