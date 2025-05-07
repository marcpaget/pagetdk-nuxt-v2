export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser()
  const token = useCookie('sb-access-token')
  
  // If there's no user but there is a token, it means we're still checking auth state
  // This prevents flash of unauthenticated content before Supabase initializes
  if (!user.value && token.value) {
    return abortNavigation()
  }
})