# Neighbourly App - Environment Variables Setup

This file explains how to set up your environment variables for local development.

## 📋 Required Files

Create the following file in the project root:

**File**: `.env.local`

⚠️ **IMPORTANT**: This file should NEVER be committed to Git. It's already in `.gitignore`.

---

## 📝 `.env.local` Template

Copy and paste this entire block into `.env.local`:

```env
# ============================================
# SUPABASE CONFIGURATION
# ============================================
# Get from: Supabase Dashboard → Settings → API

NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE

# Service Role Key (KEEP SECRET - Never share or commit!)
# Only use in backend/server code, never in client code
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY_HERE

# ============================================
# APP CONFIGURATION
# ============================================

NEXT_PUBLIC_APP_NAME=Neighbourly
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# ============================================
# EMAIL PROVIDER (Optional - Supabase default works)
# ============================================

# Option A: SendGrid (for production)
# Get from: https://sendgrid.com
SENDGRID_API_KEY=SG.YOUR_SENDGRID_KEY_HERE
SENDGRID_FROM_EMAIL=noreply@neighbourly.app

# Option B: Supabase Default (free tier - auto-enabled)
# No configuration needed! Supabase handles email sending.

# ============================================
# OPTIONAL: AWS S3 (For image storage)
# ============================================

# AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY
# AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_KEY
# AWS_S3_BUCKET=neighbourly-uploads
# AWS_S3_REGION=ap-south-1

# ============================================
# OPTIONAL: ANALYTICS
# ============================================

# NEXT_PUBLIC_GA_ID=G-YOUR_GOOGLE_ANALYTICS_ID
# NEXT_PUBLIC_POSTHOG_KEY=YOUR_POSTHOG_KEY

# ============================================
# OPTIONAL: ERROR TRACKING
# ============================================

# NEXT_PUBLIC_SENTRY_DSN=YOUR_SENTRY_DSN
```

---

## 🔑 How to Get Your Keys

### Supabase API Keys

1. Go to: https://supabase.com/dashboard/projects
2. Select your "Neighbourly" project
3. Click **Settings** (bottom left)
4. Click **API** tab
5. You'll see:
   - **Project URL**: Copy this → `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API Keys** section:
     - **public (anon key)**: Copy this → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - **service_role key**: Copy this → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

### SendGrid API Key (Optional)

1. Go to: https://sendgrid.com/dashboard
2. Navigate to: **Settings → API Keys**
3. Click **Create API Key**
4. Name: `Neighbourly App`
5. Select **Full Access** or **Mail Send** permission only
6. Copy the key → `SENDGRID_API_KEY`

### Google Analytics (Optional)

1. Go to: https://analytics.google.com
2. Create new property for Neighbourly
3. Copy Measurement ID → `NEXT_PUBLIC_GA_ID`

---

## ✅ Step-by-Step Setup

### Step 1: Create .env.local
1. Open project root directory
2. Create new file: `.env.local`
3. **Do NOT use `.env` file** - must be `.env.local`

### Step 2: Copy Template
Copy the template above into `.env.local`

### Step 3: Get Supabase Keys
1. Login to Supabase dashboard
2. Copy URL and Anon Key
3. Paste into `.env.local`

### Step 4: Save & Restart
1. Save file
2. Restart development server: `npm run web:dev`
3. Server will read new variables ✅

### Step 5: Verify
1. Open http://localhost:3000
2. Try signup/login flow
3. Should work with email OTP ✅

---

## 🔒 Security Tips

✅ **DO**:
- Keep `.env.local` in `.gitignore` (already configured)
- Use strong, unique values
- Rotate keys periodically
- Use Supabase's built-in email for demo
- Enable RLS on Supabase

❌ **DON'T**:
- Commit `.env.local` to Git
- Share keys in chat/email
- Use production keys in development
- Put `SUPABASE_SERVICE_ROLE_KEY` in client code
- Enable CORS for all domains

---

## 🚀 For Production

### Before Deploying to Production:

1. **Create separate Supabase project** for production
2. **Update environment variables** on hosting platform:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Build & Deploy → Environment
   - Railway: Variables tab
3. **Never use development keys** in production
4. **Enable RLS policies** on all tables
5. **Setup backup strategy**
6. **Enable monitoring & alerts**

### Production `.env.local` (Example):
```env
NEXT_PUBLIC_SUPABASE_URL=https://prod-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=prod-anon-key...
SUPABASE_SERVICE_ROLE_KEY=prod-service-role-key...
NEXT_PUBLIC_APP_URL=https://neighbourly.app
NODE_ENV=production
SENDGRID_API_KEY=sg-prod-key...
```

---

## 🐛 Troubleshooting

### "Supabase connection error"
- Check `NEXT_PUBLIC_SUPABASE_URL` is correct (starts with `https://`)
- Check `NEXT_PUBLIC_SUPABASE_ANON_KEY` is not empty
- Restart dev server

### "Email OTP not working"
- Check email provider is configured in Supabase
- Verify email is being sent (check spam folder)
- Wait 30 seconds between OTP requests

### "Variables not loading"
- Make sure file is named `.env.local` (not `.env`)
- Make sure it's in root directory (same level as `package.json`)
- Restart development server after saving

### "Variables undefined"
- In client code, variables must start with `NEXT_PUBLIC_`
- In server code, all variables are available
- Make sure variables are quoted if they contain special characters

---

## 📚 Environment Variable Cheat Sheet

| Variable | Type | Required | Where to Get |
|----------|------|----------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | ✅ Yes | Supabase Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | ✅ Yes | Supabase Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret | ✅ Yes | Supabase Settings → API |
| `SENDGRID_API_KEY` | Secret | ❌ Optional | SendGrid Dashboard |
| `NEXT_PUBLIC_APP_URL` | Public | ❌ Optional | Your app URL |
| `NODE_ENV` | Public | ✅ Yes | Set to `development` or `production` |

---

## 🎯 Quick Copy-Paste Guide

### For Local Development (Fastest)
```powershell
# Only fill these 3 required variables:
NEXT_PUBLIC_SUPABASE_URL=<your-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-key>
SUPABASE_SERVICE_ROLE_KEY=<your-key>
NODE_ENV=development
```

### For Demo/Testing
Add all basic variables:
```powershell
# Basic setup
NEXT_PUBLIC_SUPABASE_URL=<your-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-key>
SUPABASE_SERVICE_ROLE_KEY=<your-key>
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### For Production
```powershell
# Production setup (on hosting platform)
NEXT_PUBLIC_SUPABASE_URL=https://prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=prod-anon-key
SUPABASE_SERVICE_ROLE_KEY=prod-service-role-key
NEXT_PUBLIC_APP_URL=https://neighbourly.app
NODE_ENV=production
SENDGRID_API_KEY=sg-prod-key
```

---

## ✨ Verification Checklist

After setting up `.env.local`:

- [ ] File named `.env.local` (not `.env`)
- [ ] File is in project root directory
- [ ] `NEXT_PUBLIC_SUPABASE_URL` is set
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is set
- [ ] Development server restarted
- [ ] Can signup with email OTP ✅
- [ ] Can login and create posts ✅

---

## 📞 Need Help?

- Check Supabase docs: https://supabase.com/docs
- Check Next.js environment docs: https://nextjs.org/docs/basic-features/environment-variables
- Check project SUPABASE_SETUP_GUIDE.md

---

**Ready to start?** Run `npm run web:dev` and open http://localhost:3000 🚀

