# 🚀 Neighbourly App - Supabase Setup & Demo Guide

**Complete Setup Instructions for Production-Ready Demo**

---

## 📋 Table of Contents

1. [Supabase Account Setup](#supabase-account-setup)
2. [Create Project & Get Credentials](#create-project--get-credentials)
3. [Deploy Database Schema](#deploy-database-schema)
4. [Configure Email OTP](#configure-email-otp)
5. [Setup Environment Variables](#setup-environment-variables)
6. [Run Demo Locally](#run-demo-locally)
7. [Test Authentication Flow](#test-authentication-flow)

---

## ✅ Supabase Account Setup

### Step 1: Create Free Supabase Account
1. Go to https://supabase.com
2. Click **"Start Your Project"**
3. Sign up with email or GitHub
4. Verify email

### Step 2: Create New Organization (Optional)
- Click **"New Organization"**
- Name it: **Neighbourly**
- Choose your region (nearest to India: **Singapore** recommended)

---

## 🔐 Create Project & Get Credentials

### Step 1: Create New Project
1. Click **"New Project"**
2. **Project Name**: `neighbourly-app`
3. **Database Password**: Create strong password (save it!)
4. **Region**: Select **Singapore** (closest to India)
5. Click **"Create new project"** (Wait 2-3 minutes)

### Step 2: Get API Credentials
Once project is created:
1. Go to **Settings → API**
2. Copy these values:
   - **Project URL**: `https://[PROJECT_ID].supabase.co`
   - **Anon Key**: (public key)
   - **Service Role Key**: (secret key - save in .env ONLY)

### Step 3: Save to Environment File
Create/update `C:\Users\LENOVO\Desktop\Neighbourly\.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR_PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (paste here)

# Supabase Service Role (SECRET - Never commit this!)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (paste here)

# Email Provider (for OTP sending)
SENDGRID_API_KEY=SG.xxxxxxxxxxxx...

# Or use Supabase's built-in email (free tier limited)
```

---

## 🔧 Deploy Database Schema

### Option A: Using Supabase Dashboard (Recommended for First Time)

#### Step 1: Open SQL Editor
1. In Supabase Dashboard → **SQL Editor**
2. Click **"New Query"**

#### Step 2: Create Extensions & Enums
Copy and run this SQL:

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Create Enums
CREATE TYPE user_status AS ENUM ('active', 'banned', 'deleted');
CREATE TYPE post_category AS ENUM ('discussion', 'safety_alert', 'lost_found', 'recommendation', 'event', 'marketplace');
CREATE TYPE listing_category AS ENUM ('electronics', 'furniture', 'clothing', 'books', 'services', 'other');
CREATE TYPE notification_type AS ENUM ('like', 'comment', 'message', 'follow', 'event_reminder', 'safety_alert');
CREATE TYPE group_category AS ENUM ('sports', 'hobbies', 'parenting', 'professional', 'social', 'other');
CREATE TYPE indian_cities AS ENUM ('Ghaziabad', 'Delhi', 'Noida');
CREATE TYPE listing_status AS ENUM ('active', 'sold', 'archived');
```

**Click "Run"** ✅

#### Step 3: Create All Tables

Copy from `supabase/migrations/0001_initial_schema.sql` and run section by section (see file at bottom of this guide).

#### Step 4: Seed Location Data

Copy from `supabase/migrations/0002_seed_locations.sql` and run.

---

### Option B: Using CLI (Advanced)

```powershell
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref [YOUR_PROJECT_ID]

# Enter your database password when prompted

# Apply migrations
supabase db push
```

---

## 📧 Configure Email OTP

### Step 1: Enable Email Auth Provider
1. Go to **Authentication → Providers**
2. Find **Email**
3. Toggle **Enable**
4. Under "Email Auth", check:
   - ✅ **Enable Email OTP**
   - ✅ **Enable Email Password** (for fallback)
5. Click **Save**

### Step 2: Configure Email Sending

#### Option A: Use Supabase Default (Recommended for Demo)
- Supabase provides limited free email sending
- Perfect for testing (100 emails/day on free tier)
- No setup needed!

#### Option B: Use SendGrid (For Production)

1. Sign up at https://sendgrid.com (free tier: 100 emails/day)
2. Create API Key:
   - Go to **Settings → API Keys**
   - Click **Create API Key**
   - Name: `Neighbourly App`
   - Save the key
3. In Supabase → **Authentication → Email**:
   - Select **Custom SMTP**
   - Provider: SendGrid
   - API Key: Paste your SendGrid key
4. Set sender email: `noreply@neighbourly.app` (update in SendGrid)

### Step 3: Customize Email Templates (Optional)
In **Authentication → Email Templates**:
- Click **OTP** 
- Customize subject and body
- Example:
  ```
  Subject: Your Neighbourly OTP is {{ .Otp }}
  Body:
  Hi {{ .Email }},
  
  Your one-time password is: {{ .Otp }}
  Valid for 5 minutes.
  
  Never share this code.
  ```

---

## 🔑 Setup Environment Variables

### Complete `.env.local` Template

Create file: `C:\Users\LENOVO\Desktop\Neighbourly\.env.local`

```env
# ============================================
# SUPABASE CONFIGURATION
# ============================================
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR_PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[Your Anon Key]
SUPABASE_SERVICE_ROLE_KEY=[Your Service Role Key]

# ============================================
# EMAIL CONFIGURATION
# ============================================
# Option 1: Supabase Default (No config needed)
# Option 2: SendGrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@neighbourly.app

# ============================================
# APP CONFIGURATION
# ============================================
NEXT_PUBLIC_APP_NAME=Neighbourly
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# ============================================
# ANALYTICS (Optional)
# ============================================
NEXT_PUBLIC_GA_ID=G-xxxxxxxxxxxx

# ============================================
# AWS S3 (For image uploads - Optional)
# ============================================
# AWS_ACCESS_KEY_ID=
# AWS_SECRET_ACCESS_KEY=
# AWS_S3_BUCKET=neighbourly-uploads
# AWS_S3_REGION=ap-south-1
```

**⚠️ IMPORTANT**: 
- Never commit `.env.local` to GitHub
- `.env.local` is in `.gitignore` by default
- Service Role Key is SECRET - store safely

---

## 💻 Run Demo Locally

### Step 1: Install Dependencies

```powershell
cd C:\Users\LENOVO\Desktop\Neighbourly

# Install all dependencies
npm install

# If you get warnings, that's OK - they're from old packages
```

### Step 2: Run Development Server

```powershell
# Start web development server
npm run web:dev

# Output should show:
# ▲ Next.js 14.x.x
# Local: http://localhost:3000
```

### Step 3: Open in Browser

- Open: **http://localhost:3000**
- You should see login page ✅

---

## 🧪 Test Authentication Flow

### Flow 1: New User Registration

#### Step 1: Click "Sign Up"
- You should see signup form

#### Step 2: Enter Email
- Example: `testuser@gmail.com`
- Click **"Send OTP"**
- Check your email inbox

#### Step 3: Verify OTP
- Copy OTP from email
- Paste in verification field
- Click **"Verify OTP"**

#### Step 4: Complete Profile
After OTP verification, you'll see:
- **Name**: (auto-filled or edit)
- **Phone**: (10 digits)
- **Select Location**:
  - City: Delhi
  - Area: Connaught Place
  - Neighborhood: Select any
- **Bio**: (optional)
- Click **"Complete Profile"**

#### Step 5: Dashboard
- ✅ You're now logged in!
- See community feed, posts, marketplace

---

### Flow 2: Login (Existing User)

#### Step 1: Go to /auth/login

#### Step 2: Enter Email
- Example: `testuser@gmail.com`
- Click **"Send OTP"**

#### Step 3: Check Email & Verify
- Copy OTP from email
- Paste and verify
- ✅ Logged in!

---

### Flow 3: Forgot Password / Reset via OTP

#### Step 1: On Login Page
- Click **"Forgot Password?"** (see next section for setup)

#### Step 2: Enter Email
- `testuser@gmail.com`
- Click **"Send Reset Link"**

#### Step 3: Check Email
- Get OTP + temporary link

#### Step 4: Verify & Reset
- Enter OTP
- Create new password (optional)
- ✅ Password reset complete!

---

## 🔐 Password Reset API (Production)

### Create Password Reset Endpoint

File: `apps/web/app/api/auth/reset-password/route.ts`

```typescript
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// Step 1: Send password reset OTP
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, action } = body;

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    if (action === 'send-reset-otp') {
      // Send OTP for password reset
      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json(
        { message: 'OTP sent to email' },
        { status: 200 }
      );
    }

    if (action === 'verify-reset-otp') {
      // Verify OTP and create session
      const { email, otp, newPassword } = body;

      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'recovery',
      });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      // Update password if provided
      if (newPassword) {
        const { error: updateError } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (updateError) {
          return NextResponse.json({ error: updateError.message }, { status: 400 });
        }
      }

      return NextResponse.json(
        { data, message: 'Password reset successful' },
        { status: 200 }
      );
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

---

## 📊 Database Schema (Full)

**File**: `supabase/migrations/0001_initial_schema.sql`

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- ============ ENUMS ============
CREATE TYPE user_status AS ENUM ('active', 'banned', 'deleted');
CREATE TYPE post_category AS ENUM ('discussion', 'safety_alert', 'lost_found', 'recommendation', 'event', 'marketplace');
CREATE TYPE listing_category AS ENUM ('electronics', 'furniture', 'clothing', 'books', 'services', 'other');
CREATE TYPE notification_type AS ENUM ('like', 'comment', 'message', 'follow', 'event_reminder', 'safety_alert');
CREATE TYPE group_category AS ENUM ('sports', 'hobbies', 'parenting', 'professional', 'social', 'other');
CREATE TYPE indian_cities AS ENUM ('Ghaziabad', 'Delhi', 'Noida');
CREATE TYPE listing_status AS ENUM ('active', 'sold', 'archived');

-- ============ CITIES & LOCATIONS ============
CREATE TABLE IF NOT EXISTS cities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name indian_cities NOT NULL UNIQUE,
  description TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS areas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  city_id UUID NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(city_id, name)
);

CREATE TABLE IF NOT EXISTS neighborhoods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  area_id UUID NOT NULL REFERENCES areas(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  postal_code VARCHAR(10),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(area_id, name)
);

-- ============ USERS ============
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  bio TEXT,
  avatar_url TEXT,
  city_id UUID REFERENCES cities(id),
  area_id UUID REFERENCES areas(id),
  neighborhood_id UUID REFERENCES neighborhoods(id),
  status user_status DEFAULT 'active',
  verified_email BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);

-- ============ POSTS & ENGAGEMENT ============
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  city_id UUID NOT NULL REFERENCES cities(id),
  category post_category NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, post_id),
  UNIQUE(user_id, comment_id),
  CHECK ((post_id IS NOT NULL AND comment_id IS NULL) OR (post_id IS NULL AND comment_id IS NOT NULL))
);

-- ============ MARKETPLACE ============
CREATE TABLE IF NOT EXISTS listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  city_id UUID NOT NULL REFERENCES cities(id),
  category listing_category NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
  status listing_status DEFAULT 'active',
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============ MESSAGING ============
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  participant_1_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  participant_2_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  last_message_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CHECK (participant_1_id < participant_2_id)
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============ GROUPS ============
CREATE TABLE IF NOT EXISTS groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  city_id UUID NOT NULL REFERENCES cities(id),
  creator_id UUID NOT NULL REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  avatar_url TEXT,
  category group_category NOT NULL,
  members_count INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS group_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(group_id, user_id)
);

-- ============ EVENTS ============
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES users(id),
  city_id UUID NOT NULL REFERENCES cities(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_date TIMESTAMP NOT NULL,
  location VARCHAR(255),
  image_url TEXT,
  attending_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS event_attendees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rsvp_status VARCHAR(50) DEFAULT 'attending',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(event_id, user_id)
);

-- ============ NOTIFICATIONS ============
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  actor_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  related_post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  related_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============ FOLLOWS & BLOCKS ============
CREATE TABLE IF NOT EXISTS follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

CREATE TABLE IF NOT EXISTS blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blocker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  blocked_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(blocker_id, blocked_id),
  CHECK (blocker_id != blocked_id)
);

-- ============ REPORTS & MODERATION ============
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID NOT NULL REFERENCES users(id),
  reported_user_id UUID REFERENCES users(id),
  related_post_id UUID REFERENCES posts(id),
  related_comment_id UUID REFERENCES comments(id),
  reason TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============ INDEXES ============
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_city_id ON posts(city_id);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_likes_user_id ON likes(user_id);
CREATE INDEX idx_listings_user_id ON listings(user_id);
CREATE INDEX idx_listings_city_id ON listings(city_id);
CREATE INDEX idx_listings_category ON listings(category);
CREATE INDEX idx_conversations_participants ON conversations(participant_1_id, participant_2_id);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_users_city_id ON users(city_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_follows_follower_id ON follows(follower_id);
CREATE INDEX idx_follows_following_id ON follows(following_id);
CREATE INDEX idx_blocks_blocker_id ON blocks(blocker_id);
```

---

## 📍 Seed Location Data

**File**: `supabase/migrations/0002_seed_locations.sql`

```sql
-- Insert Cities
INSERT INTO cities (name, latitude, longitude, description) VALUES
('Ghaziabad', 28.6692, 77.4538, 'Industrial and residential hub in NCR'),
('Delhi', 28.7041, 77.1025, 'Capital of India'),
('Noida', 28.5355, 77.3910, 'Planned city in NCR');

-- Get city IDs for reference
DO $$
DECLARE
  ghaziabad_id UUID;
  delhi_id UUID;
  noida_id UUID;
BEGIN
  SELECT id INTO ghaziabad_id FROM cities WHERE name = 'Ghaziabad';
  SELECT id INTO delhi_id FROM cities WHERE name = 'Delhi';
  SELECT id INTO noida_id FROM cities WHERE name = 'Noida';

  -- ========== GHAZIABAD AREAS ==========
  INSERT INTO areas (city_id, name, description, latitude, longitude) VALUES
  (ghaziabad_id, 'Indirapuram', 'Premium residential area', 28.6120, 77.3915),
  (ghaziabad_id, 'Vaishali', 'Planned area with good infrastructure', 28.6135, 77.3748),
  (ghaziabad_id, 'Kaushambi', 'Commercial and residential hub', 28.6096, 77.3572),
  (ghaziabad_id, 'Loni', 'Industrial area', 28.6800, 77.3700),
  (ghaziabad_id, 'Tronica City', 'IT and business hub', 28.6920, 77.4080);

  -- ========== DELHI AREAS ==========
  INSERT INTO areas (city_id, name, description, latitude, longitude) VALUES
  (delhi_id, 'Connaught Place', 'Central business district', 28.6328, 77.1895),
  (delhi_id, 'Greater Kailash', 'Residential upscale area', 28.5244, 77.2013),
  (delhi_id, 'South Delhi', 'Posh residential locality', 28.5355, 77.2091),
  (delhi_id, 'Dwarka', 'Suburban residential area', 28.5921, 77.0460),
  (delhi_id, 'Rohini', 'Large residential colony', 28.7505, 77.0588),
  (delhi_id, 'Pitampura', 'North Delhi residential', 28.7469, 77.1119),
  (delhi_id, 'Defence Colony', 'Upscale South Delhi', 28.5664, 77.2438);

  -- ========== NOIDA AREAS ==========
  INSERT INTO areas (city_id, name, description, latitude, longitude) VALUES
  (noida_id, 'Sector 18', 'Commercial and retail hub', 28.5860, 77.3573),
  (noida_id, 'Sector 62', 'IT and business park area', 28.4744, 77.3860),
  (noida_id, 'Sector 50', 'Residential with good amenities', 28.5591, 77.3818),
  (noida_id, 'Sector 51', 'Residential area', 28.5598, 77.3820),
  (noida_id, 'Greater Noida', 'Extended Noida', 28.4744, 77.5193);

  -- ========== NEIGHBORHOODS FOR GHAZIABAD ==========
  INSERT INTO neighborhoods (area_id, name, postal_code, description) 
  SELECT id, 'East Indirapuram', '201010', 'Premium East Sector' FROM areas WHERE city_id = ghaziabad_id AND name = 'Indirapuram'
  UNION ALL
  SELECT id, 'West Indirapuram', '201010', 'West Sector' FROM areas WHERE city_id = ghaziabad_id AND name = 'Indirapuram'
  UNION ALL
  SELECT id, 'Vaishali Sector 1', '201012', 'Sector 1' FROM areas WHERE city_id = ghaziabad_id AND name = 'Vaishali'
  UNION ALL
  SELECT id, 'Vaishali Sector 2', '201012', 'Sector 2' FROM areas WHERE city_id = ghaziabad_id AND name = 'Vaishali'
  UNION ALL
  SELECT id, 'Kaushambi East', '201010', 'East Zone' FROM areas WHERE city_id = ghaziabad_id AND name = 'Kaushambi'
  UNION ALL
  SELECT id, 'Kaushambi West', '201010', 'West Zone' FROM areas WHERE city_id = ghaziabad_id AND name = 'Kaushambi';

  -- ========== NEIGHBORHOODS FOR DELHI ==========
  INSERT INTO neighborhoods (area_id, name, postal_code, description)
  SELECT id, 'Central CP', '110001', 'Main Connaught Place' FROM areas WHERE city_id = delhi_id AND name = 'Connaught Place'
  UNION ALL
  SELECT id, 'New Delhi Station', '110001', 'Near Railway Station' FROM areas WHERE city_id = delhi_id AND name = 'Connaught Place'
  UNION ALL
  SELECT id, 'Greater Kailash 1', '110048', 'GK I Zone' FROM areas WHERE city_id = delhi_id AND name = 'Greater Kailash'
  UNION ALL
  SELECT id, 'Greater Kailash 2', '110048', 'GK II Zone' FROM areas WHERE city_id = delhi_id AND name = 'Greater Kailash'
  UNION ALL
  SELECT id, 'South Delhi Central', '110049', 'Central South' FROM areas WHERE city_id = delhi_id AND name = 'South Delhi'
  UNION ALL
  SELECT id, 'Dwarka Sector 1', '110075', 'Sector 1' FROM areas WHERE city_id = delhi_id AND name = 'Dwarka'
  UNION ALL
  SELECT id, 'Rohini Sector 1', '110085', 'Sector 1' FROM areas WHERE city_id = delhi_id AND name = 'Rohini';

  -- ========== NEIGHBORHOODS FOR NOIDA ==========
  INSERT INTO neighborhoods (area_id, name, postal_code, description)
  SELECT id, 'Sector 18 Central', '201301', 'Central Mall Area' FROM areas WHERE city_id = noida_id AND name = 'Sector 18'
  UNION ALL
  SELECT id, 'Sector 18 East', '201301', 'East Zone' FROM areas WHERE city_id = noida_id AND name = 'Sector 18'
  UNION ALL
  SELECT id, 'Sector 62 North', '201309', 'North Zone' FROM areas WHERE city_id = noida_id AND name = 'Sector 62'
  UNION ALL
  SELECT id, 'Sector 50 Main', '201303', 'Main Area' FROM areas WHERE city_id = noida_id AND name = 'Sector 50'
  UNION ALL
  SELECT id, 'Sector 51 East', '201304', 'East Zone' FROM areas WHERE city_id = noida_id AND name = 'Sector 51'
  UNION ALL
  SELECT id, 'Greater Noida West', '201306', 'West Zone' FROM areas WHERE city_id = noida_id AND name = 'Greater Noida';

END $$;
```

---

## 🛡️ Row Level Security (RLS) - Optional

For production, add RLS policies:

```sql
-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can only see their own profile
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Public posts are visible to all
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Posts are viewable by anyone"
  ON posts FOR SELECT
  USING (true);

CREATE POLICY "Users can create posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Messages are private
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their messages"
  ON messages FOR SELECT
  USING (
    auth.uid() IN (
      SELECT participant_1_id FROM conversations WHERE id = conversation_id
      UNION
      SELECT participant_2_id FROM conversations WHERE id = conversation_id
    )
  );

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);
```

---

## 📞 Troubleshooting

### Issue: "Email verification not working"
**Solution**: 
1. Check spam folder
2. Verify SendGrid/email provider is configured
3. Check email templates in Supabase dashboard

### Issue: "PGRST103: Unauthorized"
**Solution**:
1. Check if RLS policies are set correctly
2. Verify JWT token in Authorization header
3. Ensure user is authenticated

### Issue: "Database connection refused"
**Solution**:
1. Verify Supabase URL is correct in `.env.local`
2. Check internet connection
3. Verify Supabase project is running (check dashboard)

### Issue: "Foreign key constraint error"
**Solution**:
1. Make sure cities/areas/neighborhoods are seeded first
2. Always insert data in correct order (parent → child)
3. Use correct UUIDs when inserting

---

## ✨ Next Steps

1. ✅ Set up Supabase account
2. ✅ Create project & get credentials
3. ✅ Deploy schema using SQL above
4. ✅ Configure email OTP
5. ✅ Set environment variables
6. ✅ Run `npm install && npm run web:dev`
7. ✅ Test registration flow
8. ✅ Invite test users to demo

---

## 🎉 You're Ready for Demo!

Your production-ready Neighbourly app is ready to:
- ✅ Register users with email OTP
- ✅ Login with OTP (no password)
- ✅ Reset password via OTP
- ✅ Complete user profiles
- ✅ Browse community feed
- ✅ Use marketplace
- ✅ Send direct messages

**Share this link for live demo**: http://localhost:3000

---

**Questions?** Check Supabase docs: https://supabase.com/docs

