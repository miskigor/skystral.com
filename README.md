# Skystral Marketing

Digital marketing platform for business growth.

## Deployment Instructions

### Environment Variables

Before deploying, you MUST configure these environment variables on your hosting platform:

```
VITE_SUPABASE_URL=https://simlbqpepeblqjqyndif.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpbWxicXBlcGVibHFqcXluZGlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNzMxNjUsImV4cCI6MjA4Mjk0OTE2NX0.myGzL9Z6Xxtq3T6oVvM6fhbKL0YZDFbUAA66-cGEeTs
```

### Netlify

1. Go to Site Settings → Build & Deploy → Environment Variables
2. Add both variables above
3. Redeploy the site

### Vercel

1. Go to Project Settings → Environment Variables
2. Add both variables above
3. Redeploy

### GitHub Pages

GitHub Pages doesn't support environment variables at build time. You need to use a different hosting platform (Netlify or Vercel recommended).

## Local Development

```bash
npm install
npm run dev
```
