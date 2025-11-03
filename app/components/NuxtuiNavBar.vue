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
    <UNavigationMenu   highlight
    highlight-color="primary" content-orientation="vertical" :items="items" />
      <template #right>
        <div class="pr-4">
                     <UColorModeSwitch />
      </div>
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
         

 
      </template>
    </UHeader>
  <!-- </div> -->
</template>