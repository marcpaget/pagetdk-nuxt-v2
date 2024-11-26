// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nuxt-mapbox", "@nuxt/image", "@nuxtjs/supabase"],
mapbox: {
  accessToken: '{MAPBOX_API_KEY}'
},
image: {
  cloudinary: {
    baseURL: 'https://res.cloudinary.com/selfhostingninja/image/upload/v1684195448/pagetdk-nuxt',
  },
},
  compatibilityDate: "2024-11-19"
})