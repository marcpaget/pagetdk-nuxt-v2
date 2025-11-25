<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

const supabase = useSupabaseClient()
const toast = useToast()
const loginError = ref(false)
const showForgotPassword = ref(false)
const resetEmail = ref('')
const resetEmailSent = ref(false)

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
  },
  {
    name: 'remember',
    label: 'Remember me',
    type: 'checkbox',
  },
]

const providers = [
  {
    label: 'Google',
    icon: 'i-simple-icons-google',
    onClick: () => {
      toast.add({ title: 'Google', description: 'Login with Google' })
    },
  },
  {
    label: 'GitHub',
    icon: 'i-simple-icons-github',
    onClick: () => {
      toast.add({ title: 'GitHub', description: 'Login with GitHub' })
    },
  },
]

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log('Submitted', payload)

  const email = payload.data.email
  const password = payload.data.password

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    loginError.value = true
    toast.add({
      title: 'Login Failed',
      description: error.message,
      color: 'error',
    })
    return
  }

  if (data.user) {
    console.log('Login successful, redirecting to /confirm')
    loginError.value = false
    toast.add({
      title: 'Success',
      description: 'You have been logged in',
      color: 'success',
    })

    // Use navigateTo instead of router.push for better Nuxt compatibility
    await navigateTo('/confirm')
  }
}

async function handlePasswordReset() {
  if (!resetEmail.value) {
    toast.add({
      title: 'Email Required',
      description: 'Please enter your email address',
      color: 'error',
    })
    return
  }

  const { error } = await supabase.auth.resetPasswordForEmail(
    resetEmail.value,
    {
      redirectTo: `${window.location.origin}/reset-password`,
    },
  )

  if (error) {
    toast.add({
      title: 'Error',
      description: error.message,
      color: 'error',
    })
    return
  }

  resetEmailSent.value = true
  toast.add({
    title: 'Email Sent',
    description: 'Check your email for password reset instructions',
    color: 'success',
  })
}
</script> 
<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard v-if="!showForgotPassword" class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        :fields="fields"
        :providers="providers"
        title="Welcome back!"
        icon="i-lucide-lock"
        @submit="onSubmit"
      >
        <template #description>
          Don't have an account? <ULink to="/signup" class="text-primary font-medium">Sign up</ULink>.
        </template>
        <template #password-hint>
          <ULink @click="showForgotPassword = true" class="text-primary font-medium cursor-pointer" tabindex="-1">Forgot password?</ULink>
        </template>
        <template #validation>
          <UAlert v-if="loginError" color="error" icon="i-lucide-info" title="Error signing in" />
        </template>
        <template #footer>
          By signing in, you agree to our <ULink to="#" class="text-primary font-medium">Terms of Service</ULink>.
        </template>
      </UAuthForm>
    </UPageCard>

    <UPageCard v-else-if="showForgotPassword && !resetEmailSent" class="w-full max-w-md">
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-mail" class="text-xl text-primary" />
            <h2 class="text-2xl font-bold">Reset Password</h2>
          </div>
          <p class="text-gray-500 dark:text-gray-400">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
        </div>
        
        <form @submit.prevent="handlePasswordReset" class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium">Email</label>
            <UInput
              v-model="resetEmail"
              type="email"
              placeholder="your@email.com"
              icon="i-lucide-mail"
              size="lg"
              required
            />
          </div>

          <div class="flex flex-col gap-2">
            <UButton type="submit" color="primary" size="lg" block>
              Send Reset Link
            </UButton>
            <UButton
              type="button"
              color="neutral"
              variant="ghost"
              size="lg"
              block
              @click="showForgotPassword = false"
            >
              Back to Login
            </UButton>
          </div>
        </form>
      </div>
    </UPageCard>

    <UPageCard v-else-if="resetEmailSent" class="w-full max-w-md">
      <div class="flex flex-col gap-6 text-center">
        <div class="flex flex-col items-center gap-3">
          <UIcon name="i-lucide-mail-check" class="text-5xl text-success" />
          <h2 class="text-2xl font-bold">Check Your Email</h2>
        </div>
        <p class="text-gray-600 dark:text-gray-300">
          We've sent password reset instructions to <span class="font-medium">{{ resetEmail }}</span>.
          Please check your inbox and follow the link to reset your password.
        </p>
        <UButton
          color="primary"
          size="lg"
          block
          @click="showForgotPassword = false; resetEmailSent = false; resetEmail = ''"
        >
          Back to Login
        </UButton>
      </div>
    </UPageCard>
  </div>
</template>
