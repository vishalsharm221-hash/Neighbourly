# 🚀 Neighbourly - Quick Start Reference

**Get the app running in 5 minutes!**

---

## 1️⃣ Setup Supabase (1 min)

```
1. Go to https://supabase.com → Sign up
2. Create project: "neighbourly-app"
3. Region: Singapore
4. Copy API URL and Anon Key
```

---

## 2️⃣ Create `.env.local` (30 sec)

**File**: `C:\Users\LENOVO\Desktop\Neighbourly\.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

---

## 3️⃣ Deploy Database (1 min)

1. Supabase Dashboard → **SQL Editor**
2. Copy SQL from `SUPABASE_SETUP_GUIDE.md`
3. Run section by section
4. ✅ Done!

---

## 4️⃣ Enable Email OTP (30 sec)

1. Supabase Dashboard → **Authentication** → **Providers**
2. Toggle **Email OTP** ON
3. Click **Save**
4. ✅ Done!

---

## 5️⃣ Run Locally (1 min)

```powershell
cd C:\Users\LENOVO\Desktop\Neighbourly
npm install
npm run web:dev
```

Open: **http://localhost:3000** ✅

---

## 🧪 Test Flows

### ✅ Sign Up with Email OTP
1. Click "Sign Up"
2. Enter email
3. Check inbox for OTP
4. Verify & complete profile
5. ✅ Logged in!

### ✅ Login with Email OTP
1. Enter email (no password!)
2. Check inbox for OTP
3. ✅ Logged in!

### ✅ Forgot Password (Reset via OTP)
1. Click "Forgot Password?"
2. Enter email
3. Check inbox for OTP
4. Verify & set new password
5. ✅ Done!

---

## 📂 Key Files

| File | Purpose |
|------|---------|
| `SUPABASE_SETUP_GUIDE.md` | Complete Supabase setup instructions |
| `DEMO_GUIDE.md` | Step-by-step demo flows |
| `ENV_SETUP.md` | Environment variables explained |
| `.env.local` | Your local configuration (NOT committed) |

---

## 🎯 Features Ready to Demo

✅ Email OTP Registration (No password!)
✅ Email OTP Login
✅ Forgot Password (OTP-based reset)
✅ User profiles with location selection
✅ Community feed with posts
✅ Marketplace with listings
✅ Direct messaging between users
✅ Comments & likes
✅ Category filtering

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Email OTP not received | Check spam folder, wait 30 sec, verify Supabase email settings |
| Connection error | Verify `.env.local` URL is correct, restart server |
| Database error | Run SQL schema again, verify location data is seeded |
| Variables undefined | Restart dev server, use `NEXT_PUBLIC_` prefix for client vars |

---

## 📱 Demo Sequence (10 min)

1. **Sign Up** (2 min) - Show OTP flow
2. **Complete Profile** (1 min) - Show location selection
3. **Dashboard** (2 min) - Show feed, create post
4. **Marketplace** (2 min) - Show listings, create item
5. **Messages** (2 min) - Show messaging interface
6. **Password Reset** (1 min) - Show forgot password with OTP

---

## 🔒 Authentication System

```
NO PASSWORD ON FIRST LOGIN!

First Time:
1. Email → OTP sent → Verify → Profile complete → LOGGED IN ✅

Subsequent Logins:
1. Email → OTP sent → Verify → LOGGED IN ✅ (No password!)

Forgot Password (Optional):
1. Email → Recovery OTP sent → Verify → Set new password (optional)
```

---

## 🎬 Start Demo Now!

1. ✅ `.env.local` created with Supabase keys
2. ✅ Database schema deployed
3. ✅ Email OTP enabled
4. ✅ Run `npm run web:dev`
5. ✅ Open http://localhost:3000
6. ✅ Click "Sign Up"
7. ✅ Follow sign-up flow

---

## 📚 Detailed Guides

- Full Setup: See `SUPABASE_SETUP_GUIDE.md`
- Demo Flows: See `DEMO_GUIDE.md`
- Env Setup: See `ENV_SETUP.md`

---

**Let's go! 🚀** http://localhost:3000

