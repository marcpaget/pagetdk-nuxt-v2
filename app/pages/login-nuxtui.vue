<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'
import { ref } from 'vue'
import * as z from 'zod'

const toast = useToast()

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

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

type Schema = z.output<typeof schema>

const error = ref<string | null>(null)
const mode = ref<'login' | 'signup'>('login')

function onSubmit(payload: FormSubmitEvent<Schema>) {
  error.value = null
  if (mode.value === 'login') {
    // Simulate login logic
    if (
      payload.data.email !== 'user@example.com' ||
      payload.data.password !== 'password123'
    ) {
      error.value = 'Invalid email or password.'
    } else {
      toast.add({
        title: 'Login successful',
        description: `Welcome, ${payload.data.email}`,
      })
    }
  } else {
    // Simulate sign up logic
    if (!payload.data.email.endsWith('@example.com')) {
      error.value = 'Sign up requires an @example.com email.'
    } else {
      toast.add({
        title: 'Sign up successful',
        description: `Account created for ${payload.data.email}`,
      })
      mode.value = 'login'
    }
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        :fields="fields"
        :title="mode === 'login' ? 'Welcome back!' : 'Create an account'"
        icon="i-lucide-lock"
        @submit="onSubmit"
      >
        <template #description>
          <span v-if="mode === 'login'">
            Don't have an account?
            <ULink to="#" class="text-primary font-medium" @click.prevent="mode = 'signup'">Sign up</ULink>.
          </span>
          <span v-else>
            Already have an account?
            <ULink to="#" class="text-primary font-medium" @click.prevent="mode = 'login'">Sign in</ULink>.
          </span>
        </template>
        <template #password-hint>
          <ULink to="#" class="text-primary font-medium" tabindex="-1">Forgot password?</ULink>
        </template>
        <template #validation>
          <UAlert v-if="error" color="error" icon="i-lucide-info" :title="error" />
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>

