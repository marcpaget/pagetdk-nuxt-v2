<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

// Logout function
const handleLogout = async () => {
  const { error } = await supabase.auth.signOut()
  if (!error) {
    await router.push('/login')
  }
}

const items = ref<NavigationMenuItem[][]>([
  [
  {
    label: 'Projects',
    icon: 'i-lucide-book-open',
    children: [
      {
        label: 'GeoInfo',
        description: 'Real-time geolocation tracking with advanced features',
        icon: 'i-lucide-map',
        to: '/geoinfo'
      },
      {
        label: 'FlagQuiz',
        description: 'Test your knowledge of world flags',
        icon: 'i-lucide-flag',
        to: '/flagquiz'
      },
      {
        label: 'Gallery',
        icon: 'i-lucide-images',
        description: 'Browse through our image collection',
        to: '/gallery'
      },
    ]
  },
  {
    label: 'CV',
    icon: 'i-lucide-user',
    children: [
      {
        label: 'About',
        icon: 'i-lucide-file-text',
        description: 'Learn more about this project',
        to: '/about'
      }
    ]
  },
  {
    label: 'Misc',
    icon: 'i-lucide-box',
    children: [
      {
        label: 'Sri Lanka Timeline',
        icon: 'i-lucide-clock',
        description: 'Explore historical timeline',
        to: '/srilankatimeline'
      }
    ]
  }
  ],
  [
    {
      slot: 'auth' as const,
    },
    {
      slot: 'colormode' as const,
    }
  ]
])
</script>

<template>
  <div class="flex items-center justify-between w-full">
    <UNavigationMenu :items="items" class="flex-1 justify-center">
      <template #auth>
        <div class="flex items-center gap-3">
          <div v-if="user" class="flex items-center gap-2">
            <UAvatar 
              :src="user.user_metadata?.avatar_url" 
              :alt="user.email" 
              size="sm"
            />
            <UButton 
              @click="handleLogout"
              variant="ghost"
              size="sm"
              icon="i-lucide-log-out"
            >
              Logout
            </UButton>
          </div>
          <UButton 
            v-else
            to="/login"
            variant="solid"
            size="sm"
            icon="i-lucide-log-in"
          >
            Login
          </UButton>
        </div>
      </template>
      <template #colormode>
        <ColorModeButton />
      </template>
    </UNavigationMenu>
  </div>
</template>