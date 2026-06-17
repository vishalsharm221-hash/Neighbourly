# Neighbourly - Your Neighborhood Community App

A production-ready, cross-platform community application for neighborhoods in Delhi, Noida, and Ghaziabad. Built with modern technologies for maximum code reuse and fast deployment.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm 9+
- Git
- Supabase account (for database and auth)
- Expo CLI (for mobile development)

### Installation

```bash
# Clone the repository
git clone https://github.com/vishalsharm221-hash/Neighbourly.git
cd Neighbourly

# Install dependencies
npm install

# Setup environment variables
cp apps/web/.env.local.example apps/web/.env.local
cp apps/mobile/.env.local.example apps/mobile/.env.local

# Edit the .env.local files with your Supabase credentials
```

### Running the App

```bash
# Start all apps in parallel
npm run dev

# Or start specific apps
npm run web:dev    # Next.js web app on http://localhost:3000
npm run mobile:dev # Expo mobile app
```

### Building

```bash
npm run build       # Build all apps
npm run type-check  # Type check all apps
npm run lint        # Lint all apps
```

## 📁 Project Structure

```
Neighbourly/
├── apps/
│   ├── web/           # Next.js web application
│   └── mobile/        # React Native + Expo mobile app
├── packages/
│   ├── types/         # Shared TypeScript types
│   ├── utils/         # Shared utilities (Supabase, areas data)
│   └── config/        # ESLint and other configs
├── supabase/
│   ├── migrations/    # Database migrations
│   └── seed/          # Seed data scripts
└── turbo.json         # Turborepo configuration
```

## ✨ Features

### Phase 1 (Current)
- ✅ Email OTP Authentication
- ✅ User profiles with area selection
- ✅ Multi-city support (Delhi, Noida, Ghaziabad)
- ✅ All local areas pre-populated

### Phase 2
- 🔄 Feed/Posts (recommendations, questions, alerts)
- 🔄 Local Groups & Communities
- 🔄 Marketplace (Buy/Sell locally)

### Phase 3
- 🔄 Direct Messaging
- 🔄 Events & Alerts
- 🔄 User Verification
- 🔄 Search & Discovery

### Phase 4
- 🔄 Mobile app optimization
- 🔄 Push notifications
- 🔄 Analytics & admin dashboard

## 🗄️ Database

All three cities (Delhi, Noida, Ghaziabad) with their local areas are pre-populated in the database.

### Database Schema
- **areas**: All neighborhoods for 3 cities
- **profiles**: User profiles with location
- **posts**: Community feed (recommendations, questions, alerts)
- **comments**: Post comments
- **listings**: Marketplace items
- **groups**: Local communities
- **events**: Neighborhood events
- **messages**: Direct messaging
- **conversations**: Message threads

### Running Database Migrations

```bash
# Login to Supabase CLI
supabase login

# Link your project
supabase link --project-ref your_project_ref

# Run migrations
supabase db push
```

## 🔐 Environment Variables

### Web App (`apps/web/.env.local`)
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Mobile App (`apps/mobile/.env.local`)
```
EXPO_PUBLIC_SUPABASE_URL=your_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_key
EXPO_PUBLIC_APP_ENV=development
```

## 🛠️ Tech Stack

- **Monorepo**: Turborepo
- **Web**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Mobile**: React Native, Expo
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Shared**: TypeScript, shared types and utilities

## 📝 API Endpoints

- `POST /api/auth/send-otp` - Send OTP to email
- `POST /api/auth/verify` - Verify OTP and create session

## 🚢 Deployment

### Web App (Vercel)
```bash
npm run build
vercel deploy
```

### Mobile App (Expo)
```bash
npm run build
eas submit
```

## 📱 Cities & Areas

### Delhi (15 areas)
Central, North, South, East, West, New Delhi, Dwarka, Rohini, South Extension, Connaught Place, R K Puram, Greater Kailash, Vasant Kunj, etc.

### Noida (15 areas)
Sector 1-12, 15, 16, 18

### Ghaziabad (15 areas)
Indirapuram, Vasundhara, Kavi Nagar, Loni, Sahibabad, Meerut Road, Mohan Nagar, etc.

## 📞 Support

For issues, feature requests, or questions, please open an issue on GitHub.

## 📄 License

MIT License - see LICENSE file for details

---

**Built with ❤️ for Indian neighborhoods**
