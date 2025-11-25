<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

const supabase = useSupabaseClient()
const router = useRouter()
const toast = useToast()
const signupSuccess = ref(false)
const userEmail = ref('')

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
  email: z.email('Invalid email'),
  password: z
    .string('Password is required')
    .min(8, 'Must be at least 8 characters'),
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log('Submitted', payload)

  const email = payload.data.email
  const password = payload.data.password

  // Sign up the user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'localhost:3000/confirm',
    },
  })

  if (error) {
    toast.add({
      title: 'Sign up error',
      description: error.message,
      color: 'error',
    })
    return
  }

  // Check if user already exists (no identities means email already registered)
  if (
    data.user &&
    (!data.user.identities || data.user.identities.length === 0)
  ) {
    toast.add({
      title: 'Account Already Exists',
      description: 'This email is already registered. Please try logging in.',
      color: 'warning',
      timeout: 0,
      actions: [
        {
          label: 'Go to Login',
          onClick: () => {
            router.push('/login')
          },
        },
      ],
    })
    return
  }

  // Success - show confirmation message
  userEmail.value = email
  signupSuccess.value = true
}
</script>

<template>
  <ClientOnly>
    <div class="flex flex-col items-center justify-center gap-4 p-4">
      <UPageCard class="w-full max-w-md">
        <!-- Show success message after signup -->
        <div v-if="signupSuccess" class="text-center space-y-4">
        <UIcon name="i-lucide-mail-check" class="size-16 mx-auto text-success" />
        <h2 class="text-2xl font-bold">Check Your Email</h2>
        <p class="text-muted">
          We've sent a confirmation email to <strong>{{ userEmail }}</strong>
        </p>
        <p class="text-sm text-muted">
          Please click the link in the email to confirm your account and complete the signup process.
        </p>
        <UButton
          to="/login"
          variant="solid"
          color="primary"
          class="mt-4"
        >
          Go to Login
        </UButton>
      </div>

      <!-- Show signup form -->
      <UAuthForm
        v-else
        :schema="schema"
        title="Sign Up"
        icon="i-lucide-user-plus"
        :fields="fields"
        :providers="providers"
        @submit="onSubmit"
      >
        <template #description>
          Create your account to get started.
        </template>
        <template #footer>
          Already have an account? <ULink to="/login" class="text-primary font-medium">log in</ULink>.
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
  </ClientOnly>
</template>

