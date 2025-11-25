<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

const supabase = useSupabaseClient()
const router = useRouter()
const toast = useToast()

async function signUpNewUser(
  email: string,
  password: string,
  firstname: string,
  lastname: string,
) {
  // Check password strength
  const passwordScore = checkStrength(password).filter((req) => req.met).length
  if (passwordScore < 4) {
    toast.add({
      title: 'Weak Password',
      description: 'Please meet all password requirements',
      color: 'error',
    })
    return
  }

  // Sign up the user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: '/confirm',
      data: {
        first_name: firstname,
        last_name: lastname,
      },
    },
  })

  if (error) {
    // Check if user already exists
    if (
      error.message.includes('already registered') ||
      error.message.includes('already exists') ||
      error.status === 422
    ) {
      toast.add({
        title: 'Account Already Exists',
        description:
          'This email is already registered. Please try logging in instead.',
        color: 'warning',
        timeout: 5000,
        actions: [
          {
            label: 'Go to Login',
            onClick: () => router.push('/login'),
          },
        ],
      })
    } else {
      toast.add({
        title: 'Signup Failed',
        description: error.message,
        color: 'error',
      })
    }
    return
  }

  if (data.user) {
    // Check if user needs to confirm email or was auto-confirmed
    const needsConfirmation =
      data.user.identities && data.user.identities.length === 0

    if (needsConfirmation) {
      toast.add({
        title: 'Account Already Exists',
        description:
          'This email is already registered. Please check your email or try logging in.',
        color: 'warning',
        timeout: 5000,
        actions: [
          {
            label: 'Go to Login',
            onClick: () => router.push('/login'),
          },
        ],
      })
    } else {
      toast.add({
        title: 'Success',
        description: 'Please check your email to confirm your account',
        color: 'success',
      })
      // Redirect to confirmation page or login
      router.push('/confirm')
    }
  }
}

// Password strength checker
const show = ref(false)
const showConfirm = ref(false)
const password = ref('')
const confirmPassword = ref('')

function checkStrength(str: string) {
  const requirements = [
    { regex: /.{8,}/, text: 'At least 8 characters' },
    { regex: /\d/, text: 'At least 1 number' },
    { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
    { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
  ]

  return requirements.map((req) => ({
    met: req.regex.test(str),
    text: req.text,
  }))
}

const strength = computed(() => checkStrength(password.value))
const score = computed(() => strength.value.filter((req) => req.met).length)

const color = computed(() => {
  if (score.value === 0) return 'neutral'
  if (score.value <= 1) return 'error'
  if (score.value <= 2) return 'warning'
  if (score.value === 3) return 'warning'
  return 'success'
})

const text = computed(() => {
  if (score.value === 0) return 'Enter a password'
  if (score.value <= 2) return 'Weak password'
  if (score.value === 3) return 'Medium password'
  return 'Strong password'
})

const passwordsMatch = computed(() => {
  if (!confirmPassword.value) return true // Don't show error until user starts typing
  return password.value === confirmPassword.value
})

const confirmPasswordColor = computed(() => {
  if (!confirmPassword.value) return 'neutral'
  return passwordsMatch.value ? 'success' : 'error'
})

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    required: true,
  },
  {
    name: 'firstname',
    label: 'First Name',
    type: 'text',
    placeholder: 'Enter your first name',
    required: true,
  },
  {
    name: 'lastname',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Enter your last name',
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
    name: 'confirmpassword',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Enter your password again',
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
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  password: z.string().min(8, 'Must be at least 8 characters'),
  confirmpassword: z.string().min(8, 'Must be at least 8 characters'),
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log('=== FORM SUBMITTED ===')
  console.log('Payload:', payload)

  // Use payload data directly
  const formPassword = payload.data.password
  const formConfirmPassword = payload.data.confirmpassword

  console.log('Form password:', formPassword)
  console.log('Form confirm password:', formConfirmPassword)

  // Validate passwords match
  if (formPassword !== formConfirmPassword) {
    toast.add({
      title: 'Error',
      description: 'Passwords do not match',
      color: 'error',
    })
    return
  }

  // Validate password strength
  const passwordStrength = checkStrength(formPassword).filter(
    (req) => req.met,
  ).length
  if (passwordStrength < 4) {
    toast.add({
      title: 'Weak Password',
      description: 'Please meet all password requirements',
      color: 'error',
    })
    return
  }

  await signUpNewUser(
    payload.data.email,
    formPassword,
    payload.data.firstname,
    payload.data.lastname,
  )
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        title="Sign Up"
        description="Create your account to get started."
        icon="i-lucide-user-plus"
        :fields="fields"
        @submit="onSubmit"
      />
      <!-- <template #password-field>
          <div class="space-y-2">
            <UFormField label="Password">
              <UInput
                v-model="password"
                name="password"
                placeholder="Password"
                :color="color"
                :type="show ? 'text' : 'password'"
                :aria-invalid="score < 4"
                aria-describedby="password-strength"
                :ui="{ trailing: 'pe-1' }"
                class="w-full"
              >
                <template #trailing>
                  <UButton
                    color="neutral"
                    variant="link"
                    size="sm"
                    :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                    :aria-label="show ? 'Hide password' : 'Show password'"
                    :aria-pressed="show"
                    aria-controls="password"
                    @click="show = !show"
                  />
                </template>
              </UInput>
            </UFormField>

            <UProgress
              :color="color"
              :indicator="text"
              :model-value="score"
              :max="4"
              size="sm"
            />

            <p id="password-strength" class="text-sm font-medium">
              {{ text }}. Must contain:
            </p>

            <ul class="space-y-1" aria-label="Password requirements">
              <li
                v-for="(req, index) in strength"
                :key="index"
                class="flex items-center gap-0.5"
                :class="req.met ? 'text-success' : 'text-muted'"
              >
                <UIcon :name="req.met ? 'i-lucide-circle-check' : 'i-lucide-circle-x'" class="size-4 shrink-0" />

                <span class="text-xs font-light">
                  {{ req.text }}
                  <span class="sr-only">
                    {{ req.met ? ' - Requirement met' : ' - Requirement not met' }}
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </template>
        <template #confirmpassword-field>
          <UFormField 
            label="Confirm Password"
            :error="!passwordsMatch && confirmPassword ? 'Passwords do not match' : undefined"
          >
            <UInput
              v-model="confirmPassword"
              name="confirmpassword"
              placeholder="Confirm your password"
              :color="confirmPasswordColor"
              :type="showConfirm ? 'text' : 'password'"
              :ui="{ trailing: 'pe-1' }"
              class="w-full"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="showConfirm ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="showConfirm ? 'Hide password' : 'Show password'"
                  :aria-pressed="showConfirm"
                  @click="showConfirm = !showConfirm"
                />
              </template>
            </UInput>
          </UFormField>
        </template> -->
    </UPageCard>
  </div>
</template>

