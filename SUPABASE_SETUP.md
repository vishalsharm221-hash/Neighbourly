# 🚀 Neighbourly - Supabase Setup Guide

This guide will help you set up Supabase for the Neighbourly application. This is **REQUIRED** before you can run the app.

## Prerequisites

- Supabase account (free tier is fine for MVP): https://supabase.com
- Node.js 18+
- Git

---

## Step 1: Create a Supabase Project

1. Go to [app.supabase.com](https://app.supabase.com)
2. Sign in or create an account
3. Click **"New Project"**
4. Configure:
   - **Name**: Neighbourly
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Select Asia-South (Mumbai) or closest to you
   - **Pricing Plan**: Free tier
5. Click **"Create new project"**
6. Wait for the project to initialize (5-10 minutes)

---

## Step 2: Get Your Credentials

Once your project is ready:

1. Go to **Settings** → **API**
2. Copy these values:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

3. Create `.env.local` in the root directory:

```bash
cp .env.example .env.local
```

4. Edit `.env.local` and add:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Step 3: Set Up Email Authentication

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Email** and make sure it's enabled
3. Go to **Email Templates**
4. Use the default OTP template (or customize if needed)

### Optional: Use SendGrid for Better Email Delivery

For production:

1. Create a SendGrid account: https://sendgrid.com
2. Go to Supabase → **Authentication** → **Email**
3. Switch from "Auth Emails" to "Custom SMTP"
4. Enter your SendGrid credentials
5. Add SendGrid API key to `.env.local`:

```env
SENDGRID_API_KEY=your_sendgrid_api_key_here
```

---

## Step 4: Run Database Migrations

### Option A: Using Supabase CLI (Recommended)

```bash
# Install Supabase CLI
npm install -g supabase

# Initialize Supabase in project
supabase init

# Login to Supabase
supabase login

# Link project
supabase link --project-ref your_project_ref

# Push migrations
supabase db push
```

### Option B: Manual SQL Migration

1. Go to Supabase Dashboard → **SQL Editor**
2. Create a new query
3. Copy content from `supabase/migrations/0001_initial_schema.sql`
4. Run it
5. Repeat for `supabase/migrations/0002_seed_locations.sql`

---

## Step 5: Set Up Row Level Security (RLS)

For production, enable Row Level Security on all tables:

1. Go to **Authentication** → **Policies**
2. For each table, create policies:

```sql
-- Example policy for posts table
CREATE POLICY "Users can view all posts"
ON posts FOR SELECT
USING (true);

CREATE POLICY "Users can create own posts"
ON posts FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts"
ON posts FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts"
ON posts FOR DELETE
USING (auth.uid() = user_id);
```

---

## Step 6: Configure Storage (for Images)

1. Go to **Storage** in Supabase
2. Create new bucket: `neighbourly-uploads`
3. Set permissions to public (for MVP)
4. Set upload size limit to 50MB

---

## Step 7: Test the Connection

```bash
# Install dependencies
npm install

# Run development server
npm run web:dev
```

Visit `http://localhost:3000`

You should see the Neighbourly home page. Click "Sign Up" to test:

1. Enter your email
2. Check your email for OTP
3. Verify you can log in

---

## Step 8: Verify Database Is Populated

1. Go to Supabase → **Table Editor**
2. You should see these tables:
   - `cities` - Should have 3 rows (Delhi, Ghaziabad, Noida)
   - `areas` - Should have 25+ rows
   - `neighborhoods` - Should have 70+ rows
   - `auth.users` - Will grow as users sign up

---

## Common Issues & Solutions

### ❌ "Invalid API key" Error
- Make sure you copied the entire key correctly
- Check `.env.local` has no extra spaces
- Restart the dev server after changing `.env.local`

### ❌ "Email not sent" Error
- Check Supabase Email tab for delivery logs
- Make sure email provider (Resend or SendGrid) is configured
- Verify email is not going to spam

### ❌ "No tables found" Error
- Ensure migrations were run successfully
- Check SQL Editor to verify tables exist
- Re-run migrations if needed

### ❌ "CORS error" on requests
- Go to **Authentication** → **URL Configuration**
- Add your localhost URL: `http://localhost:3000`
- For production, add your domain

---

## Next Steps

1. Complete `.env.local` configuration
2. Run database migrations
3. Test email OTP flow
4. Start building features!

---

## Useful Links

- [Supabase Docs](https://supabase.com/docs)
- [Supabase CLI Reference](https://supabase.com/docs/guides/cli)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Email Auth Guide](https://supabase.com/docs/guides/auth/auth-email)

---

**Questions?** Check the [Neighbourly GitHub Issues](https://github.com/vishalsharm221-hash/Neighbourly/issues)
