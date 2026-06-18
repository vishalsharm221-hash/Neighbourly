# 🎉 Neighbourly App - Complete Demo Guide

## ⚡ Quick Start (5 Minutes)

### Prerequisites
- Node.js 18+ (check: `node --version`)
- Supabase account (free tier available)
- Git installed

---

## 📋 Step 1: Setup Supabase (2 minutes)

### 1.1 Create Supabase Account
1. Visit https://supabase.com
2. Click **"Start Your Project"**
3. Sign up with email or GitHub
4. Create organization: **Neighbourly**
5. Region: **Singapore** (closest to India)

### 1.2 Get Credentials
1. Dashboard → **Settings** → **API**
2. Copy:
   - **Project URL**: `https://[PROJECT-ID].supabase.co`
   - **Anon Key**: (public key)

### 1.3 Create `.env.local`
Create file: `C:\Users\LENOVO\Desktop\Neighbourly\.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

**Save & close file!**

---

## 🗄️ Step 2: Deploy Database Schema (1 minute)

### 2.1 Open SQL Editor
1. Supabase Dashboard → **SQL Editor**
2. Click **"New Query"**

### 2.2 Copy & Run SQL
1. Go to `SUPABASE_SETUP_GUIDE.md` (in project root)
2. Find section: "Deploy Database Schema"
3. Copy **Extensions & Enums** SQL block
4. Paste into Supabase SQL Editor
5. Click **"Run"** ✅

### 2.3 Run Rest of Schema
1. Copy remaining SQL from same guide
2. Run section by section
3. You should see tables being created ✅

### 2.4 Seed Location Data
1. Copy SQL from "Seed Location Data" section
2. Paste and run ✅
3. Database ready! 🎉

---

## 📧 Step 3: Enable Email OTP (30 seconds)

### 3.1 Configure Email Provider
1. Supabase Dashboard → **Authentication** → **Providers**
2. Find **Email**
3. Toggle **Enable Email OTP** ✅
4. Click **Save** ✅

**Done!** You're using Supabase's free email sending.

---

## 💻 Step 4: Run Local Development Server (1 minute)

### 4.1 Install Dependencies
```powershell
cd C:\Users\LENOVO\Desktop\Neighbourly
npm install
```

Wait for installation to complete (3-5 minutes first time).

### 4.2 Start Development Server
```powershell
npm run web:dev
```

You should see:
```
▲ Next.js 14.x.x
✓ Ready in 2.5s

Local:        http://localhost:3000
```

---

## 🎯 Step 5: Test Complete Authentication Flow

### **DEMO FLOW 1: New User Registration**

#### Part A: Sign Up
1. Open http://localhost:3000
2. Click **"Sign Up"**
3. Enter email: `test@example.com`
4. Click **"Send OTP"**
5. ✅ **Check inbox** for OTP email

#### Part B: Verify OTP
1. Copy OTP from email (6 digits)
2. Paste in verification field
3. Click **"Verify"**
4. ✅ **OTP verified!**

#### Part C: Complete Profile
After verification, fill form:
- **Name**: Your Name
- **Phone**: 9876543210
- **City**: Delhi
- **Area**: Connaught Place
- **Neighborhood**: Central CP
- **Bio**: (optional)
- Click **"Complete Profile"**
- ✅ **You're logged in!**

#### Part D: Explore Dashboard
- ✅ See community feed
- ✅ Create post button visible
- ✅ Marketplace link visible
- ✅ Messages link visible

---

### **DEMO FLOW 2: Login (Existing User)**

#### Part A: Go to Login
1. Click **Profile** → **Logout**
2. You're back at login page

#### Part B: Login with Email OTP
1. Enter same email: `test@example.com`
2. Click **"Send Verification Link"**
3. ✅ **Check email for new OTP**
4. Copy OTP
5. Click **"Verify OTP"**
6. ✅ **Instantly logged in!** (No password!)

---

### **DEMO FLOW 3: Forgot Password / Reset via OTP**

#### Part A: Forget Password
1. On login page, click **"Forgot Password?"**
2. Enter email: `test@example.com`
3. Click **"Send OTP"**
4. ✅ **Check email for reset OTP**

#### Part B: Verify & Reset
1. Copy OTP from email
2. Paste in verification field
3. Click **"Verify OTP"**
4. ✅ **OTP verified!**

#### Part C: Set New Password
1. Enter new password (8+ chars)
2. Confirm password
3. Click **"Reset Password"**
4. ✅ **Redirected to login!**
5. Try login with new password ✅

---

## 🛝 Advanced Features to Demo

### **Feature 1: Create Post**
1. Dashboard → Click **"New Post"**
2. Fill form:
   - **Category**: Discussion
   - **Title**: "Looking for gym in CP"
   - **Description**: Tell neighbors
   - Add image (optional)
3. Click **"Post"**
4. ✅ **Post appears in feed!**

### **Feature 2: Marketplace**
1. Dashboard → Click **"Marketplace"**
2. Click **"Sell Something"**
3. Create listing:
   - **Category**: Electronics
   - **Title**: "Old Laptop"
   - **Price**: ₹15,000
   - **Description**: Details
   - Add images (up to 10)
4. Click **"List"**
5. ✅ **Listing visible on marketplace!**

### **Feature 3: Direct Messaging**
1. Dashboard → Click **"Messages"**
2. Select/create conversation
3. Type message
4. Click **"Send"**
5. ✅ **Message sent & displayed!**

---

## 🔐 Authentication System Details

### **Email OTP (No Password on First Login)**
```
1. User enters email → /api/auth/send-otp
2. Supabase sends OTP to email
3. User enters OTP → /api/auth/verify-otp
4. Session created automatically ✅
5. NO PASSWORD NEEDED!
```

### **Forgot Password (Optional Password Reset)**
```
1. User clicks "Forgot Password"
2. Enters email → /api/auth/reset-password (action: send-reset-otp)
3. Supabase sends recovery OTP
4. User enters OTP → /api/auth/reset-password (action: verify-reset-otp)
5. User sets new password (optional)
6. Can now login with new password
```

### **Session Management**
- Cookies stored in browser automatically
- Session persists across refreshes
- Logout clears session
- Auth context provides `useAuth()` hook

---

## 📊 Database Architecture

### **Tables Ready**
- ✅ users (with email OTP support)
- ✅ posts (6 categories)
- ✅ comments
- ✅ likes
- ✅ listings (marketplace)
- ✅ conversations & messages
- ✅ cities, areas, neighborhoods (3 cities, 25+ areas)
- ✅ groups, events, notifications, follows, blocks

### **What's Seeded**
- ✅ 3 Cities: Delhi, Ghaziabad, Noida
- ✅ 25+ Areas with coordinates
- ✅ 40+ Neighborhoods with postal codes

---

## 🐛 Troubleshooting

### **Issue: "Email OTP not received"**
**Solution**:
1. Check spam/promotions folder
2. Wait 30 seconds
3. Verify email provider configured in Supabase
4. Try different email address

### **Issue: "Supabase connection error"**
**Solution**:
1. Check `.env.local` has correct URL & Anon Key
2. Restart development server: `npm run web:dev`
3. Verify Supabase project is running (check dashboard)

### **Issue: "Database error / Foreign key constraint"**
**Solution**:
1. Verify schema was run correctly (check tables exist)
2. Verify location data was seeded
3. Restart development server
4. Clear browser cache (Ctrl+Shift+Delete)

### **Issue: "Can't find user after registration"**
**Solution**:
1. Check that profile completion finished
2. Verify location was selected correctly
3. Check Supabase dashboard → Authentication → Users
4. Verify email is verified in Auth

---

## 📱 Features You Can Demo

| Feature | Status | Demo Path |
|---------|--------|-----------|
| Email OTP Registration | ✅ Live | /auth/signup |
| Email OTP Login | ✅ Live | /auth/login |
| Forgot Password (OTP) | ✅ Live | /auth/forgot-password |
| User Profile | ✅ Live | /profile |
| Community Feed | ✅ Live | /dashboard |
| Create Posts | ✅ Live | /create-post |
| Comments & Likes | ✅ Live | /dashboard |
| Marketplace Browse | ✅ Live | /marketplace |
| Create Listing | ✅ Live | /create-listing |
| Direct Messages | ✅ Live | /messages |

---

## 🎬 Recommended Demo Sequence

**Duration: ~10 minutes**

1. **Registration** (2 min)
   - Sign up with email OTP
   - Verify OTP from email
   - Complete profile with location

2. **Explore Feed** (2 min)
   - Show dashboard
   - Show category filters
   - Demonstrate post creation

3. **Marketplace** (2 min)
   - Browse listings
   - Show search/filters
   - Create sample listing

4. **Messaging** (2 min)
   - Show conversations list
   - Send/receive message
   - Show real-time update

5. **Password Reset** (2 min)
   - Logout
   - Click "Forgot Password"
   - Demo OTP-based reset flow

---

## 🚀 Production Checklist

Before launching to production:

- [ ] Replace Supabase free tier with paid (if needed)
- [ ] Configure production SendGrid email
- [ ] Set up custom domain
- [ ] Enable RLS policies on tables
- [ ] Configure CORS
- [ ] Setup CI/CD pipeline
- [ ] Add error tracking (Sentry)
- [ ] Setup backups
- [ ] Configure CDN for images
- [ ] Enable rate limiting on APIs
- [ ] Add analytics
- [ ] Security audit
- [ ] Load testing

---

## 📞 Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Auth Helpers**: https://supabase.com/docs/guides/auth/auth-helpers/nextjs

---

## ✨ What's Included

### Backend
- ✅ 13 API routes (auth, users, posts, listings, messages)
- ✅ Email OTP authentication
- ✅ Password reset via OTP
- ✅ User profiles with location selection
- ✅ Community feed with filtering
- ✅ Marketplace system
- ✅ Direct messaging
- ✅ Real-time updates ready

### Frontend
- ✅ Beautiful responsive UI (Tailwind CSS)
- ✅ Multi-step forms with validation
- ✅ Error handling & loading states
- ✅ Image uploads & previews
- ✅ Category filtering
- ✅ Pagination support
- ✅ Mobile-optimized layout

### Database
- ✅ 15 tables with relationships
- ✅ 3 cities with 25+ areas seeded
- ✅ Indexes for performance
- ✅ Constraints for data integrity
- ✅ Ready for RLS policies

---

## 🎯 Next Steps After Demo

1. **Get User Feedback** - Share demo link
2. **Mobile App** - Start React Native version
3. **Scaling** - Move to production Supabase
4. **Features** - Add groups, events, notifications
5. **Marketing** - Prepare launch

---

**Ready to demo?** Open http://localhost:3000 and start signing up! 🚀

