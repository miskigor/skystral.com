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

### Testing Deployment

After deploying, if you see a blank page:

1. Open browser console (F12)
2. Look for console.log messages showing:
   - "main.tsx loaded"
   - Environment variable status
   - Any error messages
3. If environment variables show "Missing", go back to hosting platform and add them
4. If you see "App did not render - root is empty", there's a JavaScript error - check the console for details

You can also visit `https://skystral.com/test.html` to verify basic hosting is working.

## Local Development

```bash
npm install
npm run dev
```

## Troubleshooting

If the page is blank:
- Check browser console for errors
- Verify environment variables are set on hosting platform
- Make sure you redeployed after adding environment variables
- Check that the build completed successfully
