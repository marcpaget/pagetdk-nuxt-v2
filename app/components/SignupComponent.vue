<script setup lang="ts">
import { z } from 'zod'
import type { ButtonProps, FormSubmitEvent } from '#ui/types'

const supabase = useSupabaseClient()
const toast = useToast()
const success = ref(false)
const userEmail = ref('')

// biome-ignore lint: used in template
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

// biome-ignore lint: used in template
const providers = [
  {
    label: 'Continue with Google',
    icon: 'i-simple-icons-google',
    color: 'primary',
  },
  {
    label: 'Continue with GitHub',
    icon: 'i-simple-icons-github',
    color: 'neutral',
  },
] satisfies ButtonProps[]

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Must be at least 6 characters'),
})

type Schema = z.output<typeof schema>

// biome-ignore lint: used in template
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { data, error } = await supabase.auth.signUp({
    email: event.data.email,
    password: event.data.password,
  })

  if (error) {
    toast.add({
      title: 'Sign Up Failed',
      description: error.message,
      color: 'error',
    })
    return
  }

  if (data.user) {
    userEmail.value = event.data.email
    success.value = true
    toast.add({
      title: 'Success!',
      description: 'Check your email to confirm your account',
      color: 'success',
    })
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen p-4">
    <UCard class="w-full max-w-md">
      <!-- Success message after signup -->
      <div v-if="success" class="text-center space-y-4 p-6">
        <UIcon name="i-heroicons-check-circle" class="w-16 h-16 mx-auto text-green-500" />
        <h2 class="text-2xl font-bold">Check Your Email</h2>
        <p class="text-gray-600 dark:text-gray-400">
          We've sent a confirmation email to <strong>{{ userEmail }}</strong>
        </p>
        <p class="text-sm text-gray-500">
          Please click the link in the email to confirm your account.
        </p>
        <UButton to="/login" block color="primary" class="mt-4">
          Go to Login
        </UButton>
      </div>

      <!-- Signup form -->
      <UAuthForm
        v-else
        :schema="schema"
        :fields="fields"
        :providers="providers"
        title="Create an account"
        icon="i-heroicons-user-plus"
        @submit="onSubmit"
      >
        <template #description>
          Already have an account?
          <NuxtLink to="/login" class="text-primary font-medium">Sign in</NuxtLink>.
        </template>
        <template #footer>
          By signing up, you agree to our
          <NuxtLink to="#" class="text-primary font-medium">Terms of Service</NuxtLink>.
        </template>
      </UAuthForm>
    </UCard>
  </div>
</template>

