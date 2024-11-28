// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nuxt-mapbox", "@nuxt/image", "@nuxtjs/supabase", 'nuxt-api-party', "@nuxtjs/leaflet"],
mapbox: {
  accessToken: process.env.MAPBOX_API_KEY,
},
supabase: {
  url: process.env.NUXT_PUBLIC_SUPABASE_URL,
  key: process.env.NUXT_PUBLIC_SUPABASE_KEY,
  redirect: false,
  redirectOptions: {
    login: '/login',
    callback: '/confirm',
    include: undefined,
    exclude: [],
    cookieRedirect: true,
  },
},
image: {
  cloudinary: {
    baseURL: 'https://res.cloudinary.com/selfhostingninja/image/upload/v1684195448/pagetdk-nuxt',
  },
},
apiParty: {
  endpoints: {
    restCountriesApi: {
      url: 'https://restcountries.com/',
    },
  },
},
  compatibilityDate: "2024-11-19"
})