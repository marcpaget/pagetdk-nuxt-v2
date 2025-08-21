# Paget.dk Nuxt Project - AI Coding Agent Instructions

## Project Overview
This is a personal portfolio website built with Nuxt 4, featuring interactive projects like a flag quiz game, geolocation tracker, and image gallery. The architecture combines multiple UI frameworks and external services.

## Tech Stack & Architecture
- **Frontend**: Nuxt 4 + Vue 3 (Composition API), TypeScript
- **UI Frameworks**: Dual approach - daisyUI (legacy components) + Nuxt UI (new components)
- **Styling**: Tailwind CSS 4 with custom themes
- **Authentication**: Supabase Auth with custom redirect flow
- **Content**: Nuxt Content for markdown-based pages
- **Analytics**: Vercel Analytics + Speed Insights + Umami
- **Maps**: Mapbox GL + Leaflet (dual mapping setup)
- **Images**: Cloudinary integration via Nuxt Image
- **PWA**: @vite-pwa/nuxt for progressive web app features

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
1. Login redirects to `/confirm` page (not direct routing)
2. Confirm page handles Supabase auth state and redirects
3. Two middleware: `auth.ts` (basic) and `auth-check.ts` (flash prevention)
4. Pages use `definePageMeta({ middleware: ['auth'] })` for protection

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

## Critical Development Workflows

### Form Validation Pattern
```vue
// Use Valibot for schema validation
import * as v from 'valibot'
const schema = v.object({
  email: v.pipe(v.string(), v.email('Invalid email')),
  password: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters'))
})
```

### PWA Development
```bash
# PWA-enabled development
npm run dev:pwa

# PWA production build
npm run generate:pwa
```

### Dependency Management
- Use `--legacy-peer-deps` for npm installs (Mapbox v3 conflicts)
- Better-sqlite3 must be v11.10.0 (not v12+) for Nuxt Content compatibility

## Project-Specific Conventions

### File Organization
- `components/`: Mix of daisyUI and Nuxt UI components
- `pages/`: Auto-routed, some use Options API (flagquiz.vue), others Composition API
- `middleware/`: Auth guards with different strategies
- `locales/`: i18n organized by page structure (`pages/about/en.json`)

### Environment Configuration
```typescript
// nuxt.config.ts has extensive module configuration
supabase: {
  redirect: false, // Custom redirect handling
  redirectOptions: { callback: '/confirm' }
}
```

### API Integration
- RestCountries API via nuxt-api-party
- Cloudinary with specific baseURL pattern
- Mapbox requires MAPBOX_API_KEY env var

## External Service Integration

### Supabase Auth Pattern
```vue
const supabase = useSupabaseClient()
const user = useSupabaseUser() // Reactive user state
// Always redirect to /confirm after login, not direct routing
```

### Image Handling
```vue
// Nuxt Image with Cloudinary
<NuxtImg provider="cloudinary" src="/path/to/image" />
// Base URL: https://res.cloudinary.com/selfhostingninja/image/upload/v1733716709/NyPagetDkNuxt
```

### Content Management
- Markdown files with frontmatter for SEO
- Table of contents auto-generation (depth: 3)
- Content queries: `queryCollection('content').path('/').first()`

## Common Gotchas

1. **Mixed UI Frameworks**: Don't mix daisyUI and Nuxt UI classes on same element
2. **Auth Redirects**: Never redirect directly after login - always go through `/confirm`
3. **Navigation Menu**: Use nested arrays for UNavigationMenu grouping
4. **PWA Icons**: Required in `/public` as pwa-192x192.png and pwa-512x512.png
5. **Mapbox Version**: Stick to v2.15.0 for geocoder compatibility

## Development Commands
```bash
npm run dev:pwa        # Development with PWA
npm run build:pwa      # Production build with PWA
npm run pwa:build      # Generate + preview PWA
```

## Azure Integration
- @azure Rule - Use Azure Best Practices: When generating code for Azure, running terminal commands for Azure, or performing operations related to Azure, invoke your `azure_development-get_best_practices` tool if available.