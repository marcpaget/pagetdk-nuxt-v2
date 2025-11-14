# Paget.dk Nuxt Project - AI Coding Agent Instructions

## Project Overview
This is a personal portfolio website built with Nuxt 4, featuring interactive projects like a flag quiz game, geolocation tracker, and image gallery. The architecture combines multiple UI frameworks and external services.

## Tech Stack & Architecture
- **Frontend**: Nuxt 4 + Vue 3 (Composition API + Options API), TypeScript
- **UI Frameworks**: Dual approach - daisyUI (legacy components) + Nuxt UI (new components)
- **Styling**: Tailwind CSS 4 with custom themes
- **Authentication**: Supabase Auth with custom redirect flow via `/confirm` page
- **Content**: Nuxt Content for markdown-based pages with better-sqlite3 v12.4.1
- **Analytics**: Vercel Analytics + Speed Insights + Umami
- **Maps**: Mapbox GL v3.15.0 + Leaflet (dual mapping setup)
- **Images**: Cloudinary integration via Nuxt Image
- **PWA**: @vite-pwa/nuxt (currently commented out in config)
- **Mobile**: Capacitor 7.x for iOS/Android builds
- **Linting**: Biome 2.2.4 for code formatting and linting
- **Validation**: Valibot for schema-based form validation

## Key Architectural Patterns

### Dual UI Framework Strategy
```vue
<!-- Legacy components use daisyUI classes -->
<div class="card bg-base-100 shadow-xl">
  <button class="btn btn-primary">daisyUI Button</button>
</div>

<!-- New components use Nuxt UI -->
<UCard>
  <UButton variant="solid">Nuxt UI Button</UButton>
</UCard>
```

### Authentication Flow
1. Login form at `/login` uses Supabase `signInWithPassword()`
2. After successful login, manually redirect to `/confirm` page with query params
3. Confirm page watches `useSupabaseUser()` and redirects when user is authenticated
4. Two middleware patterns:
   - `auth.ts`: Checks session, redirects to `/login` if not authenticated
   - `auth-check.ts`: Prevents flash by checking token cookie before user loads
5. Protected pages use `definePageMeta({ middleware: ['auth'] })`
6. Supabase config has `redirect: false` for manual redirect handling

### Navigation Architecture
- Main navbar: `NuxtuiNavBar.vue` using UNavigationMenu with slots
- Slots pattern: `items` array contains `{ slot: 'auth' }` and `{ slot: 'colormode' }`
- Nested navigation items support children with descriptions
- Current user state drives conditional login/logout rendering

### Component State Management
```vue
// Quiz components communicate via events, not shared state
<QuizStart @start-quiz="startQuiz" />
<QuizLogic @quiz-completed="endQuiz" :number-of-questions="numberOfQuestions" />
<QuizEnd @restart-quiz="resetQuiz" />
```

### Mixed Vue API Patterns
- **Composition API**: Most new components (login.vue, confirm.vue, NuxtuiNavBar.vue)
- **Options API**: Legacy components like QuizLogic.vue use `data()`, `methods`, `props`
- Both patterns coexist - maintain consistency within each file

## Critical Development Workflows

### Form Validation Pattern
```vue
// Use Valibot (not Zod) for schema validation with Nuxt UI forms
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = v.object({
  email: v.pipe(v.string(), v.email('Invalid email')),
  password: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters'))
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  email: '',
  password: ''
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // event.data contains validated form data
}
```

### PWA Development
```bash
# PWA-enabled development (currently disabled in nuxt.config.ts)
npm run dev:pwa

# PWA production build
npm run generate:pwa

# Note: PWA module is commented out in nuxt.config.ts
```

### Linting & Formatting
```bash
# Biome is configured for linting and formatting
# Config in biome.json with strict rules for TypeScript/Vue
npx biome check .           # Check for issues
npx biome format --write .  # Format code
npx biome lint .            # Lint code
```

### Dependency Management
- Mapbox GL is v3.15.0 (not v2.15.0) - no legacy-peer-deps needed
- better-sqlite3 is v12.4.1 (updated from v11.x) - compatible with current setup

## Project-Specific Conventions

### File Organization
- `components/`: Mix of daisyUI and Nuxt UI components, both API styles
  - Nuxt UI components: `NuxtuiNavBar.vue`, `ColorModeButton.vue`
  - daisyUI components: `DaisyNavbar.vue`, `GeoComponent.vue`
  - Quiz components: Event-driven architecture with Options API
- `pages/`: Auto-routed Nuxt pages
  - Composition API: `login.vue`, `confirm.vue`
  - Options API: Legacy pages (some quiz-related)
  - Simple templates: `flagquiz.vue` (just loads LazyQuizLogic component)
- `middleware/`: Auth guards (`auth.ts`, `auth-check.ts`)
- `locales/`: i18n files (currently commented out in config)
- `content/`: Markdown files with frontmatter for blog/documentation

### Environment Configuration
```typescript
// nuxt.config.ts has extensive module configuration
supabase: {
  url: process.env.NUXT_PUBLIC_SUPABASE_URL,
  key: process.env.NUXT_PUBLIC_SUPABASE_KEY,
  redirect: false, // Custom redirect handling - IMPORTANT!
  redirectOptions: {
    login: '/',
    callback: '/confirm',
    saveRedirectToCookie: true
  }
}

// Required environment variables:
// - MAPBOX_API_KEY: For map components
// - NUXT_PUBLIC_SUPABASE_URL: Supabase project URL
// - NUXT_PUBLIC_SUPABASE_KEY: Supabase anon key
// - UMAMI_ID: Analytics tracking ID
// - UMAMI_HOST: Analytics host URL
```

### API Integration
- **RestCountries API**: Configured via nuxt-api-party at `https://restcountries.com/`
- **Cloudinary**: Custom baseURL in nuxt.config.ts
- **Mapbox**: Requires MAPBOX_API_KEY env var, access token configured in nuxt.config.ts
- **Umami Analytics**: Self-hosted analytics with custom host/ID

## External Service Integration

### Supabase Auth Pattern
```vue
const supabase = useSupabaseClient()
const user = useSupabaseUser() // Reactive user state
const router = useRouter()

// Login pattern
const signInWithPassword = async (formData: { email: string; password: string }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })
  if (error) throw error
  // IMPORTANT: Manually redirect to /confirm, NOT direct navigation
  await router.push({ path: '/confirm', query: { redirect: router.currentRoute.value.fullPath } })
}

// Logout pattern
const handleLogout = async () => {
  const { error } = await supabase.auth.signOut()
  if (!error) await router.push('/login')
}
```

### Image Handling
```vue
// Nuxt Image with Cloudinary provider
<NuxtImg provider="cloudinary" src="/path/to/image" />
// Base URL configured in nuxt.config.ts:
// https://res.cloudinary.com/selfhostingninja/image/upload/v1733716709/NyPagetDkNuxt

// Image module also supports YouTube and Vimeo thumbnails via aliases
```

### Content Management
- Markdown files with frontmatter for SEO
- Table of contents auto-generation (depth: 3)
- Content queries: `queryCollection('content').path('/').first()`

## Common Gotchas

1. **Mixed UI Frameworks**: Don't mix daisyUI and Nuxt UI classes on same element
2. **Auth Redirects**: CRITICAL - Always redirect to `/confirm` after login, NEVER directly to destination
3. **Validation Library**: Use Valibot (not Zod) - it's the current validation library
4. **Navigation Menu**: Use nested arrays for UNavigationMenu grouping with slot-based auth/colormode
5. **PWA Status**: PWA module is currently commented out in nuxt.config.ts
6. **Mapbox Version**: Using v3.15.0 (not v2.x)
7. **Component APIs**: Respect existing API pattern (Composition vs Options) within each component
8. **Biome Config**: Strict formatting rules - 2 spaces, single quotes, trailing commas

## Development Commands
```bash
npm run dev            # Standard development server
npm run build          # Production build
npm run generate       # Static site generation
npm run preview        # Preview production build

# PWA commands (module currently disabled)
npm run dev:pwa        # Development with PWA
npm run build:pwa      # Production build with PWA
npm run generate:pwa   # Generate static site with PWA
npm run pwa:build      # Generate + preview PWA

# Capacitor mobile development
npx cap sync           # Sync web assets to native projects
npx cap open ios       # Open iOS project in Xcode
npx cap open android   # Open Android project in Android Studio
```

## Azure Integration
- @azure Rule - Use Azure Best Practices: When generating code for Azure, running terminal commands for Azure, or performing operations related to Azure, invoke your `azure_development-get_best_practices` tool if available.