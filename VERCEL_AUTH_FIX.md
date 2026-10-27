# Fixing Supabase Authentication on Vercel

## Problem

Login funktionen virker ikke på Vercel fordi redirect URLs ikke er konfigureret korrekt for production miljøet.

## Løsning

### 1. Environment Variables i Vercel

Tilføj følgende environment variable i Vercel Dashboard:

**Settings → Environment Variables**

```
NUXT_PUBLIC_SITE_URL=https://din-domain.vercel.app
```

Eller for custom domain:

```
NUXT_PUBLIC_SITE_URL=https://pagetdk.com
```

> **Vigtigt**: Vercel sætter automatisk `VERCEL_URL` men denne indeholder ikke protokol. Derfor bruger vi `NUXT_PUBLIC_SITE_URL` til at eksplicit definere vores production URL.

### 2. Supabase Dashboard Configuration

Gå til din Supabase project dashboard:

**Authentication → URL Configuration**

Tilføj følgende redirect URLs:

```
http://localhost:3001/*
http://localhost:3001/**
https://din-domain.vercel.app/*
https://din-domain.vercel.app/**
https://*.vercel.app/*
https://*.vercel.app/**
```

For custom domain:

```
https://pagetdk.com/*
https://pagetdk.com/**
```

### 3. Email Templates (Valgfrit men anbefalet)

I Supabase Dashboard: **Authentication → Email Templates**

Opdater alle email templates til at bruge `{{ .RedirectTo }}` i stedet for `{{ .SiteURL }}`:

**Før:**

```html
<a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email">
  Confirm your mail
</a>
```

**Efter:**

```html
<a href="{{ .RedirectTo }}/auth/confirm?token_hash={{ .TokenHash }}&type=email">
  Confirm your mail
</a>
```

Dette gør at email links redirecter til den korrekte URL baseret på hvor brugeren startede signup flow'et.

## Hvad Er Fikset

### Files Changed

1. **`app/utils/getRedirectUrl.ts`** (NY)
   - Utility funktion der dynamisk bestemmer redirect URL
   - Understøtter Vercel deployment automatisk via environment variables
   - Fallback til localhost for development

2. **`app/components/LoginComponent.vue`**
   - Ændret `window.location.origin` til `getRedirectUrl('reset-password')`
   - Virker nu korrekt på server-side rendering

3. **`app/components/SignupComponent.vue`**
   - Ændret hardcoded `'localhost:3000/confirm'` til `getRedirectUrl('confirm')`
   - Korrekt protokol og domain for alle miljøer

4. **`nuxt.config.ts`**
   - Tilføjet `siteUrl` til runtime config
   - Eksponerer `NUXT_PUBLIC_SITE_URL` til applikationen

## Test Processen

### Lokal Test

```bash
# Sæt environment variable
export NUXT_PUBLIC_SITE_URL=http://localhost:3001

# Start development server
npm run dev
```

### Vercel Test

1. Deploy til Vercel
2. Sæt `NUXT_PUBLIC_SITE_URL` environment variable
3. Redeploy applikationen
4. Test login/signup/password reset flows

## Teknisk Forklaring

### Hvorfor `window.location.origin` Ikke Virker

På Vercel (og andre serverless platforms) sker initial rendering på serveren hvor `window` objektet ikke eksisterer. Dette forårsager:

- Runtime errors på serveren
- Forkerte redirect URLs
- Auth callbacks der fejler

### Løsningen: Environment-Based URL Detection

```typescript
const getRedirectUrl = (path = "") => {
  let url =
    process.env.NUXT_PUBLIC_SITE_URL ?? // Explicit production URL
    process.env.VERCEL_URL ?? // Vercel's auto-set URL
    "http://localhost:3001"; // Development fallback

  url = url.startsWith("http") ? url : `https://${url}`;
  url = url.endsWith("/") ? url : `${url}/`;

  return path ? `${url}${path}` : url;
};
```

Denne tilgang:

- ✅ Virker på server-side rendering
- ✅ Understøtter alle environments (dev, preview, production)
- ✅ Kræver ingen browser APIs
- ✅ Følger Supabase best practices

## Relaterede Links

- [Supabase Redirect URLs Documentation](https://supabase.com/docs/guides/auth/concepts/redirect-urls)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Nuxt Runtime Config](https://nuxt.com/docs/guide/going-further/runtime-config)

## Troubleshooting

### Login virker stadig ikke?

1. **Check Vercel Logs**: Se efter authentication fejl
2. **Verificer Environment Variables**: Både i Vercel og lokalt
3. **Tjek Supabase Logs**: Dashboard → Auth → Logs
4. **Verify Redirect URLs**: Skal matche hvad der er konfigureret i Supabase

### CORS Fejl?

Sørg for at din Vercel domain er tilføjet til Supabase's tillatte redirect URLs med wildcards (`/*` og `/**`).
