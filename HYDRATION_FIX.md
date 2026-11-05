# Hydration Mismatch Fix

## Problem
The About page content was appearing on all pages due to **Vue hydration mismatches**. This occurred when server-rendered HTML didn't match client-side expectations, causing content from one page to leak into others.

## Root Cause
Components using browser-only APIs or non-deterministic values (like `Math.random()`) were being server-side rendered, creating different output on server vs client.

### Affected Components:
1. **QuizLogic.vue** - Uses `Math.random()` for shuffling quiz questions
2. **GeoComponent.vue** - Uses `useGeolocation()` (browser geolocation API)  
3. **profile.vue** - Uses `new Date().toLocaleString()` which can differ between server/client

## Solution
Wrapped problematic components in `<ClientOnly>` to skip server-side rendering:

### 1. Flag Quiz (`/app/pages/flagquiz.vue`)
```vue
<ClientOnly>
  <QuizLogic 
    v-if="quizState === 'in-progress'" 
    @quiz-completed="endQuiz" 
    :number-of-questions="numberOfQuestions"
  />
</ClientOnly>
```

### 2. Geo Component (`/app/pages/geoinfo.vue`)
```vue
<template>
  <ClientOnly>
    <GeoComponent/>
  </ClientOnly>
</template>
```

### 3. Profile Date Display (`/app/pages/profile.vue`)
```vue
<ClientOnly>
  <p class="text-base-content/70">
    Last sign in:
    {{
      user?.last_sign_in_at
        ? new Date(user.last_sign_in_at).toLocaleString()
        : 'N/A'
    }}
  </p>
</ClientOnly>
```

## Result
✅ No more hydration mismatches  
✅ Pages render correctly  
✅ No content leaking between pages  
✅ Quiz randomization works correctly on client-side only

## Best Practices
- **Always use `<ClientOnly>`** for:
  - Browser APIs (`window`, `document`, `navigator`)
  - Non-deterministic functions (`Math.random()`, `new Date()`)
  - Client-side libraries (maps, charts, geolocation)
  - User-specific data that varies by timezone/locale
