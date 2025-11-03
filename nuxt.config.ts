// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    // Performance and optimization modules first
    //'nuxt-booster',
    // Core functionality modules
    //'nuxt-i18n-micro',
    // Content and UI modules
    '@nuxt/ui',
    '@vueuse/nuxt', // UI framework - load after content modules
    '@nuxtjs/mdc', // External service integrations
    'nuxt-toc',
    '@nuxt/content',
    '@nuxt/image', // Map modules
    '@nuxtjs/supabase', // PWA should be last to wrap everything
    'nuxt-api-party', //'@vite-pwa/nuxt',
    'nuxt-umami',
    'nuxt-mapbox',
    '@nuxtjs/leaflet',
    '@nuxt/scripts',
    '@compodium/nuxt',
    '@sentry/nuxt/module',
    '@nuxt/fonts',
  ],

  // PWA Configuration
  // pwa: {
  //   registerType: 'autoUpdate',
  //   workbox: {
  //     navigateFallback: '/',
  //     globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
  //   },
  //   client: {
  //     installPrompt: true,
  //     periodicSyncForUpdates: 20,
  //   },
  //   devOptions: {
  //     enabled: true,
  //     suppressWarnings: true,
  //     navigateFallbackAllowlist: [/^\/$/],
  //     type: 'module',
  //   },
  //   manifest: {
  //     name: 'Paget.dk',
  //     short_name: 'Paget.dk',
  //     description: 'Explore our projects, tools, and services',
  //     theme_color: '#ffffff',
  //     background_color: '#ffffff',
  //     display: 'standalone',
  //     orientation: 'portrait',
  //     scope: '/',
  //     start_url: '/',
  //     icons: [
  //       {
  //         src: 'pwa-192x192.png',
  //         sizes: '192x192',
  //         type: 'image/png',
  //       },
  //       {
  //         src: 'pwa-512x512.png',
  //         sizes: '512x512',
  //         type: 'image/png',
  //       },
  //       {
  //         src: 'pwa-512x512.png',
  //         sizes: '512x512',
  //         type: 'image/png',
  //         purpose: 'any maskable',
  //       }
  //     ],
  //   },
  // },
  // Tilføj Prisma ORM eller Drizzle ORM
  // Tilføj Supabase Auth fra Claude
  //   pwa: {
  //     /* PWA options */

  //   registerType: 'autoUpdate',
  //   workbox: {
  //     navigateFallback: '/',
  //     globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
  //   },
  //   client: {
  //     installPrompt: true,
  //     // you can omit this to use the default install prompt
  //     periodicSyncForUpdates: 20,
  //   },
  //   devOptions: {
  //     enabled: true,
  //     suppressWarnings: true,
  //     navigateFallbackAllowlist: [/^\/$/],
  //     type: 'module',
  //   },
  //   manifest: {
  //     name: 'Paget.dk',
  //     short_name: 'Paget.dk',
  //     description: 'Explore our projects, tools, and services',
  //     theme_color: '#ffffff',
  //     background_color: '#ffffff',
  //     display: 'standalone',
  //     orientation: 'portrait',
  //     scope: '/',
  //     start_url: '/',
  //     icons: [
  //       {
  //         src: 'pwa-192x192.png',
  //         sizes: '192x192',
  //         type: 'image/png',
  //       },
  //       {
  //         src: 'pwa-512x512.png',
  //         sizes: '512x512',
  //         type: 'image/png',
  //       },
  //       {
  //         src: 'pwa-512x512.png',
  //         sizes: '512x512',
  //         type: 'image/png',
  //         purpose: 'any maskable',
  //       }
  //     ],
  //   },
  // },
  runtimeConfig: {
    public: {
      supabase: {
        url: process.env.NUXT_PUBLIC_SUPABASE_URL,
        key: process.env.NUXT_PUBLIC_SUPABASE_KEY,
      },
    },
  },

  css: ['~/assets/css/main.css'],

  // i18n: {
  //   locales: [
  //     { code: 'en', iso: 'en-US', dir: 'ltr' },
  //    // { code: 'da', iso: 'da-DK', dir: 'ltr' },

  //   ],
  //   defaultLocale: 'en',
  //   translationDir: 'locales',
  //   meta: true,
  // },
  mapbox: {
    accessToken: process.env.MAPBOX_API_KEY,
  },

  umami: {
    id: process.env.UMAMI_ID,
    host: process.env.UMAMI_HOST,
    autoTrack: true,
    // proxy: 'cloak',
    // useDirective: true,
    ignoreLocalhost: true,
    // excludeQueryParams: false,
    // domains: ['cool-site.app', 'my-space.site'],
    // customEndpoint: '/my-custom-endpoint',
    // enabled: false,
    logErrors: true,
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
      saveRedirectToCookie: true,
    },
  },

  image: {
    cloudinary: {
      baseURL:
        'https://res.cloudinary.com/selfhostingninja/image/upload/v1733716709/NyPagetDkNuxt',
    },
    // Added by nuxt-booster
    screens: {
      default: 320,
      xxs: 480,
      xs: 576,
      sm: 768,
      md: 996,
      lg: 1200,
      xl: 1367,
      xxl: 1600,
      '4k': 1921,
    },

    domains: ['img.youtube.com', 'i.vimeocdn.com'],

    alias: {
      youtube: 'https://img.youtube.com',
      vimeo: 'https://i.vimeocdn.com',
    },
  },

  apiParty: {
    endpoints: {
      restCountriesApi: {
        url: 'https://restcountries.com/',
      },
    },
  },

  // Booster configuration to prevent UI conflicts
  // booster: {
  //   detection: {
  //     performance: true,
  //     browserSupport: true
  //   },
  //   performanceMetrics: {
  //     device: {
  //       hardwareConcurrency: { min: 2, max: 48 },
  //       deviceMemory: { min: 2 }
  //     },
  //     timing: {
  //       fcp: 800,
  //       dcl: 1200
  //     }
  //   },
  //   targetFormats: ['webp', 'avif', 'jpg|jpeg|png|gif'],
  //   lazyOffset: {
  //     component: '0%',
  //     asset: '0%'
  //   }
  // },
  // booster: {
  //   detection: {
  //     performance: true,
  //     browserSupport: true
  //   },
  //   performanceMetrics: {
  //     device: {
  //       hardwareConcurrency: { min: 2, max: 48 },
  //       deviceMemory: { min: 2 }
  //     },
  //     timing: {
  //       fcp: 800,
  //       dcl: 1200
  //     }
  //   },
  //   fonts: [{
  //     family: 'Font A',
  //     locals: ['Font A'],
  //     fallback: ['Arial', 'sans-serif'],
  //     variances: [
  //       {
  //         style: 'normal',
  //         weight: 400,
  //         sources: [
  //           { src: '@/assets/fonts/font-a-regular.woff', type:'woff' },
  //           { src: '@/assets/fonts/font-a-regular.woff2', type:'woff2' }
  //         ]
  //       }, {
  //         style: 'italic',
  //         weight: 400,
  //         sources: [
  //           { src: '@/assets/fonts/font-a-regularItalic.woff', type:'woff' },
  //           { src: '@/assets/fonts/font-a-regularItalic.woff2', type:'woff2' }
  //         ]
  //       }, {
  //         style: 'normal',
  //         weight: 700,
  //         sources: [
  //           { src: '@/assets/fonts/font-a-700.woff', type:'woff' },
  //           { src: '@/assets/fonts/font-a-700.woff2', type:'woff2' }
  //         ]
  //       }
  //     ]
  //   }],
  //   targetFormats: ['webp', 'avif', 'jpg|jpeg|png|gif'],
  //   componentAutoImport: true,
  //   componentPrefix: undefined,
  //   /**
  //    IntersectionObserver rootMargin for Compoennts and Assets
  //
  //   lazyOffset: {
  //     component: '0%',
  //     asset: '0%'
  //   }
  // },
  vite: {
    build: {
      chunkSizeWarningLimit: 1000, // Adjust chunk size warning limit
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router'], // Split large chunks
          },
        },
      },
    },
  },

  nitro: {
    preset: 'vercel', // Optimize for Vercel deployment
  },

  sourcemap: {
    client: false, // Disable client sourcemaps to reduce memory usage
    server: false, // Disable server sourcemaps for production
  },

  sentry: {
    sourceMapsUploadOptions: {
      org: 'marc-paget',
      project: 'pagetdk-nuxtui',
    },
    autoInjectServerSentry: 'top-level-import',
  },

  content: {
    build: {
      markdown: {
        toc: {
          depth: 3, // include h3 headings
        },
      },
    },
  },
  compatibilityDate: '2025-10-20',
})
