// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "nuxt-mapbox",
    "@nuxt/image",
    "@nuxtjs/supabase",
    'nuxt-api-party',
    "@nuxtjs/leaflet",
    "@vueuse/nuxt",
    '@primevue/nuxt-module',
    'nuxt-umami',
  ],
  primevue: {
  autoImport: true,
    options: {
        ripple: true,
        inputVariant: 'filled',
    }
},
vite: {
  plugins: [tailwindcss()],
},
css: ["~/assets/app.css"],
mapbox: {
  accessToken: process.env.MAPBOX_API_KEY,
},
umami: {
  id: '59ee0d36-a864-4a50-8f52-bc8bef01b1cd',
  host: 'https://pagetv2.netlify.app/',
  autoTrack: true,
  // proxy: 'cloak',
  // useDirective: true,
  // ignoreLocalhost: true,
  // excludeQueryParams: false,
  // domains: ['cool-site.app', 'my-space.site'],
  // customEndpoint: '/my-custom-endpoint',
  // enabled: false,
  // logErrors: true,
  // tag: 'website-variation-123',
},
supabase: {
  url: process.env.NUXT_PUBLIC_SUPABASE_URL,
  key: process.env.NUXT_PUBLIC_SUPABASE_KEY,
  redirect: false,
  redirectOptions: {
    login: '/',
    callback: '/confirm',
    include: undefined,
    exclude: [],
    cookieRedirect: true,
  },
},
image: {
  cloudinary: {
    baseURL: 'https://res.cloudinary.com/selfhostingninja/image/upload/v1733716709/NyPagetDkNuxt',
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