# Contributing & Development Guide

## Getting Started

### 1. Clone and Setup
```bash
git clone https://github.com/vishalsharm221-hash/Neighbourly.git
cd Neighbourly
npm install
```

### 2. Configure Environment Variables
```bash
# Copy environment examples
cp apps/web/.env.local.example apps/web/.env.local
cp apps/mobile/.env.local.example apps/mobile/.env.local

# Edit with your Supabase credentials
# Get keys from: https://supabase.com/dashboard
```

### 3. Setup Supabase
```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link your project
supabase link --project-ref your_project_ref

# Run migrations
supabase db push

# Seed data (optional, for local development)
supabase seed run
```

### 4. Start Development
```bash
# Terminal 1: Start web app
npm run web:dev

# Terminal 2: Start mobile app
npm run mobile:dev
```

Visit:
- Web: http://localhost:3000
- Mobile: Expo CLI will show connection info

## Project Structure Explained

```
Neighbourly/
├── apps/
│   ├── web/                 # Next.js web app
│   │   ├── app/            # App Router (Next.js 14)
│   │   │   ├── api/        # API routes
│   │   │   ├── auth/       # Auth pages
│   │   │   ├── feed/       # Feed pages
│   │   │   └── layout.tsx
│   │   ├── public/         # Static assets
│   │   └── package.json
│   └── mobile/             # React Native app
│       ├── App.tsx         # Main component
│       ├── app.json        # Expo config
│       └── package.json
├── packages/
│   ├── types/              # Shared TypeScript types
│   │   └── index.ts
│   ├── utils/              # Shared utilities
│   │   └── src/
│   │       ├── supabase.ts # Supabase client & auth
│   │       ├── areas.ts    # Cities & areas data
│   │       └── index.ts
│   └── config/             # Shared configs
│       └── eslint.js
├── supabase/
│   ├── migrations/         # Database migrations
│   │   └── 001_initial_schema.sql
│   ├── seed/              # Seed data
│   │   └── seed.ts
│   └── config.toml
├── turbo.json             # Monorepo config
├── package.json           # Root package.json
└── README.md
```

## Development Workflow

### Creating a Feature Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-name
```

### Commit Guidelines
```bash
# Good commits
git commit -m "feat: add feed post creation"
git commit -m "fix: auth OTP verification bug"
git commit -m "docs: update README with deployment steps"

# Use conventional commits:
# feat: new feature
# fix: bug fix
# docs: documentation
# style: formatting
# refactor: code restructuring
# test: adding tests
# chore: maintenance
```

### Push to GitHub
```bash
git push origin your-branch-name

# Create Pull Request on GitHub for review
```

## Working with Packages

### Adding Dependencies to Shared Packages
```bash
# Add to shared types
cd packages/types
npm install some-package

# Add to shared utils
cd packages/utils
npm install some-package

# Dependencies will be available in web and mobile apps
```

### Importing from Shared Packages
```typescript
// In web app or mobile app
import { User, Post } from '@repo/types';
import { supabase, getAreasByCity } from '@repo/utils';
import { getConfig } from '@repo/eslint-config';
```

## Database Schema

### Key Tables
- **areas**: Cities and neighborhoods (pre-populated)
- **profiles**: User information and location
- **posts**: Feed posts (recommendations, questions, alerts)
- **listings**: Marketplace items
- **groups**: Local communities
- **messages**: Direct messages between users
- **events**: Neighborhood events

### Adding New Tables
1. Create migration file in `supabase/migrations/`
2. Write SQL schema
3. Run `supabase db push`
4. Update types in `packages/types/`

### RLS (Row Level Security)
All tables have RLS enabled for security. Policies are defined per table.

## API Development

### Adding New API Routes
```typescript
// apps/web/app/api/feature/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Your logic here
    return NextResponse.json({ data: 'success' });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Your logic
}
```

## Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build
npm run build
```

## Mobile App Development

### Testing on Simulator
```bash
# iOS (Mac only)
npm run mobile:dev
# In Expo CLI, press 'i'

# Android
npm run mobile:dev
# In Expo CLI, press 'a'
```

### Building for Production
```bash
# Create EAS account at https://expo.dev
eas build --platform ios
eas build --platform android
```

## Deployment

### Web App (Vercel)
```bash
npm install -g vercel
vercel login
vercel deploy
```

### Mobile App (Expo + EAS)
```bash
eas submit --platform ios --latest
eas submit --platform android --latest
```

## Troubleshooting

### Dependencies Issues
```bash
# Clear and reinstall
npm run clean
npm install
```

### Supabase Connection Issues
- Check your `.env.local` files
- Verify Supabase project is running
- Check network connectivity

### Build Errors
```bash
# Clean build artifacts
npm run clean
npm run build
```

## Code Style

- **Language**: TypeScript (strict mode)
- **Formatting**: Prettier (auto-formatted on save)
- **Linting**: ESLint
- **Components**: Functional with React Hooks
- **Styling**: Tailwind CSS (web), React Native styles (mobile)

## Performance Best Practices

- Code split and lazy load routes
- Optimize images with Next.js Image component
- Use React Query for data fetching
- Implement pagination for lists
- Cache API responses appropriately

## Security

- Never commit `.env.local` files
- Use environment variables for secrets
- Validate all user inputs
- Implement CORS properly
- Use Row Level Security (RLS) in Supabase
- Sanitize user-generated content

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Native Documentation](https://reactnative.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [Expo Documentation](https://docs.expo.dev)
- [Turborepo Documentation](https://turbo.build/repo/docs)

## Getting Help

- Check existing GitHub issues
- Ask in pull request comments
- Review code examples in other files
- Check documentation in links above

---

**Happy coding! 🚀**
