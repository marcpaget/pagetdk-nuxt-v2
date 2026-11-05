<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

import * as v from 'valibot'

const supabase = useSupabaseClient()
const router = useRouter()
const loginError = ref('')

const signInWithPassword = async (formData: {
  email: string
  password: string
}) => {
  loginError.value = ''
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })
  if (error || !data.user) {
    loginError.value =
      error?.message || 'Login failed. Please check your credentials.'
    throw error
  }
  // Redirect to confirm page after successful login
  await router.push({
    path: '/confirm',
    query: { redirect: router.currentRoute.value.fullPath },
  })
}

const schema = v.object({
  email: v.pipe(v.string(), v.email('Invalid email')),
  password: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters')),
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  email: '',
  password: '',
})

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await signInWithPassword(event.data)
    toast.add({
      title: 'Success',
      description: 'Login successful!',
      color: 'success',
    })
  } catch (error) {
    toast.add({
      title: 'Error',
      description: loginError.value || 'Login failed',
      color: 'warning',
    })
  }
}
</script> 

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormField>

      <UButton type="submit" class="w-full">
        Sign In
      </UButton>
    </UForm>
    
    <UAlert 
      v-if="loginError" 
      color="warning" 
      variant="solid" 
      class="mt-4"
      :description="loginError"
    />
  </UPageCard>
  </div>
</template>
