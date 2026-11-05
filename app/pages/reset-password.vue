<script setup lang="ts">
import { z } from 'zod'

const supabase = useSupabaseClient()
const toast = useToast()
const newPassword = ref('')
const confirmPassword = ref('')
const passwordUpdated = ref(false)
const isLoading = ref(false)

const passwordSchema = z
  .object({
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

const updateUserPassword = async () => {
  if (isLoading.value) return

  const validation = passwordSchema.safeParse({
    newPassword: newPassword.value,
    confirmPassword: confirmPassword.value,
  })

  if (!validation.success) {
    const error = validation.error.issues[0]
    toast.add({
      title: 'Validation Error',
      description: error?.message || 'Invalid password',
      color: 'error',
    })
    return
  }

  isLoading.value = true

  const { error } = await supabase.auth.updateUser({
    password: newPassword.value,
  })

  isLoading.value = false

  if (error) {
    toast.add({
      title: 'Error',
      description: error.message,
      color: 'error',
    })
    return
  }

  passwordUpdated.value = true
  toast.add({
    title: 'Success',
    description: 'Your password has been updated',
    color: 'success',
  })

  // Redirect to login after 2 seconds
  setTimeout(() => {
    navigateTo('/login')
  }, 2000)
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4 min-h-screen">
    <UPageCard v-if="!passwordUpdated" class="w-full max-w-md">
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-lock-keyhole" class="text-xl text-primary" />
            <h2 class="text-2xl font-bold">Reset Your Password</h2>
          </div>
          <p class="text-gray-500 dark:text-gray-400">
            Enter your new password below.
          </p>
        </div>

        <form @submit.prevent="updateUserPassword" class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium">New Password</label>
            <UInput
              v-model="newPassword"
              type="password"
              placeholder="Enter new password"
              icon="i-lucide-lock"
              size="lg"
              required
            />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium">Confirm Password</label>
            <UInput
              v-model="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              icon="i-lucide-lock"
              size="lg"
              required
            />
          </div>

          <UButton
            type="submit"
            color="primary"
            size="lg"
            block
            :loading="isLoading"
            :disabled="isLoading"
          >
            Update Password
          </UButton>
        </form>
      </div>
    </UPageCard>

    <UPageCard v-else class="w-full max-w-md">
      <div class="flex flex-col gap-6 text-center">
        <div class="flex flex-col items-center gap-3">
          <UIcon name="i-lucide-check-circle" class="text-5xl text-success" />
          <h2 class="text-2xl font-bold">Password Updated!</h2>
        </div>
        <p class="text-gray-600 dark:text-gray-300">
          Your password has been successfully updated. Redirecting you to login...
        </p>
      </div>
    </UPageCard>
  </div>
</template>
