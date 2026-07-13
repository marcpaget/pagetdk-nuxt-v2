<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()
const isHydrated = ref(false)

onMounted(() => {
  isHydrated.value = true
})

// Logout function
// biome-ignore lint: used in template
const handleLogout = async () => {
  const { error } = await supabase.auth.signOut()
  if (!error) {
    await router.push('/login')
  }
}

// biome-ignore lint: used in template
const userInitials = computed(() => {
  if (user.value?.user_metadata?.full_name) {
    const names = user.value.user_metadata.full_name.split(' ')
    const initials = names
      .map((n: string) => n.charAt(0).toUpperCase())
      .join('')
    return initials
  }

  // Fallback to email if no full name
  if (user.value?.email) {
    return user.value.email.charAt(0).toUpperCase()
  }

  return '?'
})

// biome-ignore lint: used in template
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

// biome-ignore lint: used in template
const asNavItem = (item: unknown) => item as NavigationMenuItem
</script>

<template>
  <UHeader class="w-full px-8">
    <template #title>
      <h1 class="h-6 w-auto logo mr-10">Paget.dk</h1>
    </template>

    <div class="flex w-full items-center gap-14">
      <UNavigationMenu
        class="flex-1 mx-10"
        highlight
        highlight-color="primary"
        content-orientation="vertical"
        :items="items"
      >
        <template #map="{ item }">
          <ULink
            v-if="isHydrated && user"
            :to="asNavItem(item).to"
            class="flex items-center gap-2"
          >
            <UIcon :name="asNavItem(item).icon" class="size-5" />
            <div>
              <p class="font-medium">{{ asNavItem(item).label }}</p>
              <p class="text-sm text-muted">{{ asNavItem(item).description }}</p>
            </div>
          </ULink>
        </template>
      </UNavigationMenu>

      <div class="flex items-center gap-6 pl-10">
        <div v-if="isHydrated && user" class="flex items-center gap-2">
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
        <UButton v-else-if="isHydrated" to="/login" variant="solid" size="sm" icon="i-lucide-log-in">
          Login
        </UButton>
        <div v-else class="h-8 w-20" aria-hidden="true" />
        <div class="pr-4 ml-6">
          <ClientOnly>
            <UColorModeSwitch />
            <template #fallback>
              <div class="size-8" aria-hidden="true" />
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>
  </UHeader>
</template>
