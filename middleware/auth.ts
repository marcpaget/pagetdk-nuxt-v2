export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser()
  
  // If user is not logged in, redirect to login page
  if (!user.value) {
    return navigateTo('/login')
  }
})