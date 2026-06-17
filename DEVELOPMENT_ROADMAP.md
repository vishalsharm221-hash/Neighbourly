# Neighbourly - Daily Development Roadmap

**Project**: Neighbourly - A Nextdoor-like app for Indian cities (Delhi, Ghaziabad, Noida)  
**Stack**: Monorepo (Turborepo), Next.js (Web), React Native (Mobile), Supabase (DB)  
**Launch**: Production-ready MVP in 4 weeks

---

## ✅ COMPLETED (Day 1)

### Core Infrastructure
- [x] Monorepo setup (Turborepo + workspaces)
- [x] Next.js web app structure with TypeScript
- [x] React Native mobile app scaffold
- [x] Environment configuration
- [x] Git repository initialized and pushed

### Database & Schema
- [x] Complete PostgreSQL schema with 15+ tables
- [x] Cities/Areas/Neighborhoods hierarchy (3 cities, 25+ areas)
- [x] User profiles with location hierarchy
- [x] Posts system (discussion, safety, lost_found, recommendations, events, marketplace)
- [x] Marketplace listings table
- [x] Messaging system (conversations + messages)
- [x] Groups & Events tables
- [x] Notifications system
- [x] Interactions (likes, follows, blocks)
- [x] Reports system
- [x] Database seed with all Indian city areas

### API Routes (Next.js)
- [x] `/api/auth/send-otp` - OTP authentication
- [x] `/api/users` - User profile GET/POST
- [x] `/api/posts` - Posts with pagination & filtering
- [x] `/api/listings` - Marketplace listings with filters

### Frontend Foundation
- [x] TypeScript types for all entities
- [x] API utility functions
- [x] Home page skeleton

---

## 📅 DAY 2 (Today) - Authentication & User Onboarding

### Tasks
- [ ] Auth pages (login, signup, OTP verification)
- [ ] Email OTP service integration
- [ ] User onboarding flow (location selection)
- [ ] User profile page
- [ ] User profile completion form
- [ ] Session management
- [ ] Protected routes middleware

### API Routes to Create
- [ ] `/api/auth/verify` - Verify OTP
- [ ] `/api/cities` - Get all cities
- [ ] `/api/areas` - Get areas by city
- [ ] `/api/neighborhoods` - Get neighborhoods

---

## 📅 DAY 3-4 - Community Feed

### Frontend
- [ ] Feed page layout
- [ ] Post cards (discussion, safety, recommendations)
- [ ] Like/comment buttons
- [ ] Create post modal
- [ ] Filter by category
- [ ] Infinite scroll

### Backend
- [ ] `/api/posts/:id` - Get single post
- [ ] `/api/posts/:id/comments` - Comments API
- [ ] `/api/posts/:id/like` - Like/unlike post
- [ ] `/api/posts/:id/share` - Share tracking

---

## 📅 DAY 5-6 - Marketplace & Listings

### Frontend
- [ ] Marketplace page
- [ ] Listing cards with images
- [ ] Create listing form
- [ ] Listing detail page
- [ ] Search & filter listings
- [ ] Contact seller button

### Backend
- [ ] `/api/listings/:id` - Get listing details
- [ ] `/api/listings/:id/view` - Increment views
- [ ] `/api/listings/:id/inquiries` - Store inquiries
- [ ] Image upload to S3

---

## 📅 DAY 7-8 - Mobile App Foundation

### React Native Setup
- [ ] Navigation structure (React Navigation)
- [ ] Bottom tab navigator
- [ ] Auth stack
- [ ] Main app stack
- [ ] Shared UI components

### Screens
- [ ] Mobile home screen
- [ ] Mobile feed
- [ ] Mobile marketplace
- [ ] Mobile profile

---

## 📅 DAY 9-10 - Messaging System

### Frontend (Web)
- [ ] Conversations list
- [ ] Message thread view
- [ ] New message form
- [ ] Real-time updates (Supabase subscriptions)
- [ ] Typing indicators

### Backend
- [ ] `/api/conversations` - List/create conversations
- [ ] `/api/conversations/:id/messages` - Message threading
- [ ] `/api/messages/:id` - Send message
- [ ] Real-time subscriptions

### Mobile
- [ ] Messages tab
- [ ] Conversation list
- [ ] Chat screen

---

## 📅 DAY 11-12 - Groups & Events

### Frontend (Web)
- [ ] Groups discovery page
- [ ] Create group modal
- [ ] Group detail page with members
- [ ] Events calendar
- [ ] Create event form
- [ ] Event detail page
- [ ] RSVP functionality

### Backend
- [ ] `/api/groups` - List/create groups
- [ ] `/api/groups/:id/members` - Member management
- [ ] `/api/events` - List/create events
- [ ] `/api/events/:id/attendees` - Attendance tracking

---

## 📅 DAY 13-14 - Mobile App Features & Polish

### Mobile App
- [ ] Implement all web features in React Native
- [ ] Local storage & caching
- [ ] Push notifications setup
- [ ] Image picker for posts/listings
- [ ] Location access permissions
- [ ] Offline mode support

### Web Polish
- [ ] Responsive design fixes
- [ ] Loading states
- [ ] Error boundaries
- [ ] Toast notifications

---

## 📅 DAY 15+ - Production & Deployment

### Quality Assurance
- [ ] End-to-end tests (Playwright)
- [ ] Mobile app testing
- [ ] Performance optimization
- [ ] Security audit
- [ ] Database optimization

### Deployment
- [ ] Vercel deployment (web)
- [ ] EAS Build (React Native)
- [ ] Google Play Store submission
- [ ] Apple App Store submission
- [ ] Supabase production setup
- [ ] CI/CD pipeline (GitHub Actions)

### Production Ready
- [ ] Analytics integration (Sentry, Mixpanel)
- [ ] Rate limiting
- [ ] DDOS protection
- [ ] Content moderation
- [ ] User feedback system

---

## 🎯 Key Features Summary

✅ **Community Feed** - Posts with categories (discussion, safety alerts, recommendations)  
✅ **Marketplace** - Buy/sell local items with messaging  
✅ **Messaging** - Direct messages between neighbors  
✅ **Groups & Events** - Join communities and attend events  
✅ **Email OTP Auth** - Secure authentication  
✅ **Location-Based** - 3 Indian cities with neighborhood filtering  
✅ **Cross-Platform** - Web + Mobile  
✅ **Real-Time** - Live notifications and messaging  

---

## 🚀 Next Immediate Actions

1. **Today**: Complete authentication flow (Day 2)
2. **Daily**: Commit & push code at end of day
3. **Track**: Update this roadmap as tasks complete
4. **Mobile**: Start on Day 7 if web is ahead of schedule
5. **Testing**: Begin testing once features reach MVP state

---

**Status**: On Track | **Commits**: 2 | **Files**: 50+ | **APIs**: 4/40 | **DB Tables**: 15/15 ✅
