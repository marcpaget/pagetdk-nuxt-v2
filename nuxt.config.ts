// https://nuxt.com/docs/api/configuration/nuxt-config

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
    '@nuxt/ui',
    'nuxt-i18n-micro'
  ],
  primevue: {
  autoImport: true,
    options: {
        ripple: true,
        inputVariant: 'filled',
    }
},
i18n: {
  locales: [
    { code: 'en', iso: 'en-US', dir: 'ltr' },
    { code: 'da', iso: 'da-DK', dir: 'ltr' },
    
  ],
  defaultLocale: 'en',
  translationDir: 'locales',
  meta: true,
},
mapbox: {
  accessToken: process.env.MAPBOX_API_KEY,
},
umami: {
  id: process.env.UMAMI_ID,
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