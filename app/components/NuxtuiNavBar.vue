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

const userInitials = computed(() => {
  console.log('User object:', user.value)
  console.log('User metadata:', user.value?.user_metadata)

  if (user.value?.user_metadata?.full_name) {
    const names = user.value.user_metadata.full_name.split(' ')
    const initials = names
      .map((n: string) => n.charAt(0).toUpperCase())
      .join('')
    console.log('Computed initials:', initials)
    return initials
  }

  // Fallback to email if no full name
  if (user.value?.email) {
    const emailInitial = user.value.email.charAt(0).toUpperCase()
    console.log('Using email initial:', emailInitial)
    return emailInitial
  }

  console.log('No initials available')
  return '?'
})

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
          to: '/geoinfo',
        },
        {
          label: 'FlagQuiz',
          description: 'Test your knowledge of world flags',
          icon: 'i-lucide-flag',
          to: '/flagquiz',
        },
        {
          label: 'Gallery',
          icon: 'i-lucide-images',
          description: 'Browse through our image collection',
          to: '/gallery',
        },
        {
          label: 'Map',
          icon: 'i-lucide-globe',
          description: 'Interactive map based on MapLibre',
          slot: 'map' as const,
          to: '/map',
        },
      ],
    },
    {
      label: 'CV',
      icon: 'i-lucide-user',
      children: [
        {
          label: 'About',
          icon: 'i-lucide-file-text',
          description: 'Learn more about this project',
          to: '/about',
        },
        {
          label: 'Github repos',
          icon: 'i-lucide-github',
          description: 'View my GitHub repositories',
          to: '/github',
        },
      ],
    },
    {
      label: 'Misc',
      icon: 'i-lucide-box',
      children: [
        {
          label: 'Sri Lanka Timeline',
          icon: 'i-lucide-clock',
          description: 'Explore historical timeline',
          to: '/srilankatimeline',
        },
      ],
    },
  ],
])
</script>

<template>
  <!-- <div class="flex items-center justify-between w-full"> -->
    <UHeader>
      <template #title>
      <h1 class="h-6 w-auto logo">Paget.dk</h1> 
    </template>
    <UNavigationMenu highlight highlight-color="primary" content-orientation="vertical" :items="items">
      <template #map-link="{ item }">
        <ULink v-if="user" :to="item.to" class="flex items-center gap-2">
          <UIcon :name="item.icon" class="size-5" />
          <div>
            <p class="font-medium">{{ item.label }}</p>
            <p class="text-sm text-muted">{{ item.description }}</p>
          </div>
        </ULink>
      </template>
    </UNavigationMenu>
      <template #right>
        <div class="pr-4">
                     <UColorModeSwitch />
      </div>
        <div v-if="user" class="flex items-center gap-2">
            <UTooltip text="View Profile">
            <UButton 
             :label="userInitials"
              to="/profile"
              size="sm"

              color="primary"
            />
             </UTooltip>
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
      </template>
    </UHeader>
  <!-- </div> -->
</template>