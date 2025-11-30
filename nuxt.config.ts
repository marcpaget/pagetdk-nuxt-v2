// https://nuxt.com/docs/api/configuration/nuxt-config
// https://favicon.im/da/blog/add-favicon-to-nuxt3-project
// Todo: Fix Sentry Source Maps Uploading
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    // Performance and optimization modules first
    //'nuxt-booster',
    // Core functionality modules
    //'nuxt-i18n-micro',
    // Content and UI modules
    // UI framework - load after content modules
    '@nuxt/ui', // External service integrations
    '@vueuse/nuxt',
    '@nuxtjs/mdc',
    'nuxt-toc', // Map modules
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/supabase',
    'nuxt-api-party',
    'nuxt-umami',
    'nuxt-mapbox',
    '@nuxtjs/leaflet',
    '@nuxt/scripts',
    '@compodium/nuxt', // 'nuxt-particles',
    '@sentry/nuxt/module',
    '@nuxt/fonts',
    'nuxt-maplibre',
    // PWA should be last to wrap everything
    '@vite-pwa/nuxt',
  ],
  // ssr: false,
  routeRules: {
    '/map': { ssr: false },
  },
  // appwrite: {
  //   /* module options */
  // },
  runtimeConfig: {
    public: {
      supabase: {
        url: process.env.NUXT_PUBLIC_SUPABASE_URL,
        key: process.env.NUXT_PUBLIC_SUPABASE_KEY,
      },
    },
  },

  css: [
    '~/assets/css/main.css',
    './app/tailwind.css',
    'maplibre-gl/dist/maplibre-gl.css',
  ],

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Paget.dk',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, viewport-fit=cover',
        },
        {
          name: 'description',
          content: 'Explore our projects, tools, and services',
        },
        { name: 'theme-color', content: '#ffffff' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'Paget' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
    },
  },

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
      login: '/login',
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
  vite: {
    build: {
      chunkSizeWarningLimit: 1500, // Increased for icon/map libraries
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              // Core Vue/Nuxt
              if (id.includes('vue') || id.includes('nuxt')) {
                return 'vendor-core'
              }
              // UI libraries
              if (id.includes('@nuxt/ui') || id.includes('tailwind')) {
                return 'vendor-ui'
              }
              // Map libraries - split into separate chunk
              if (
                id.includes('maplibre') ||
                id.includes('mapbox') ||
                id.includes('leaflet')
              ) {
                return 'vendor-maps'
              }
              // Large icon libraries
              if (id.includes('@iconify') || id.includes('icons')) {
                return 'vendor-icons'
              }
              // Other vendors
              return 'vendor-other'
            }
          },
        },
      },
    },
    plugins: [tailwindcss()],
  },

  nitro: {
    preset: 'vercel', // Optimize for Vercel deployment
  },

  sourcemap: {
    client: false,
    server: false,
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

  // PWA Configuration
  pwa: {
    registerType: 'autoUpdate',
    workbox: {
      maximumFileSizeToCacheInBytes: 3000000,
      globPatterns: [
        '**/*.{js,css,html,png,svg,ico,woff2}',
        // Remove _payload.json pattern to avoid warning
      ],
      cleanupOutdatedCaches: true,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/api\.maptiler\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'maptiler-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /^https:\/\/res\.cloudinary\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'cloudinary-images',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
    manifest: {
      name: 'Paget.dk',
      short_name: 'Paget',
      description: 'Explore our projects, tools, and services',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      scope: '/',
      start_url: '/',
      icons: [
        {
          src: '/pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png',
        },
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      type: 'module',
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
})
