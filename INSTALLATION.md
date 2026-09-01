# SmartBazaar - Installation & Setup Guide

## 🎯 Comprehensive Setup Instructions

This guide walks you through setting up SmartBazaar from scratch.

## Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher (or yarn/pnpm)
- **Git**: For cloning the repository
- **Supabase Account**: Free tier available
- **Razorpay Account**: Optional, for payment integration

## Step 1: Clone Repository

```bash
# Clone the repository
git clone https://github.com/noimnotanshul/SmartBazaar.git

# Navigate to project directory
cd SmartBazaar

# Verify you're in the right directory
ls  # Should show package.json, README.md, etc.
```

## Step 2: Install Dependencies

```bash
# Using npm (recommended)
npm install

# Or using yarn
yarn install

# Or using pnpm
pnpm install
```

This will install all required packages listed in `package.json`.

## Step 3: Setup Supabase

### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub or email
4. Create a new organization
5. Create a new project:
   - Name: `smartbazaar`
   - Database Password: Create a strong password
   - Region: Choose closest to you (e.g., `ap-south-1` for India)
   - Click "Create new project"

### Get Supabase Credentials

1. Go to Settings → API
2. Copy the following:
   - **Project URL**: `https://[project-ref].supabase.co`
   - **Anon Public Key**: Your public API key
   - **Service Role Key**: Your private key (keep secure!)

3. Scroll down to find these in your project settings

### Setup Database Schema

1. In Supabase Dashboard, go to SQL Editor
2. Click "New Query"
3. Copy-paste entire contents of `database/schema.sql`
4. Click "Run"
5. Wait for confirmation (should see "0 rows returned" or similar)

### Enable Authentication

1. Go to Authentication → Providers
2. Click "Email" provider
3. Enable it (should be enabled by default)
4. Optional: Add Google OAuth
   - Go to Providers → Google
   - Add your Google OAuth credentials
   - Enable it

## Step 4: Create Environment File

```bash
# Copy the example environment file
cp .env.example .env.local
```

Edit `.env.local` with your actual values:

```env
# From Supabase Dashboard → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# For payments (optional, can add later)
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret

# Application settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 5: Verify Installation

```bash
# Type check TypeScript files
npm run type-check

# This should complete without errors
```

## Step 6: Run Development Server

```bash
# Start the development server
npm run dev

# Server will start on http://localhost:3000
```

You should see:
```
▲ Next.js 14.0.0
- Local:        http://localhost:3000
- Environments: .env.local
```

## Step 7: Test the Application

1. Open [http://localhost:3000](http://localhost:3000)
2. You should see the SmartBazaar homepage
3. Try signing up with an email
4. Check your email for confirmation link
5. Sign in with your credentials

## Step 8: Optional - Add Sample Data

```bash
# You can manually add products in Supabase:
# 1. Go to Supabase Dashboard → Table Editor
# 2. Select "products" table
# 3. Click "Insert Row"
# 4. Fill in product details:
#    - name: "Sample Product"
#    - price: 999
#    - mrp: 1999
#    - category: "Electronics"
#    - approved: true
#    - stock: 10
```

## Troubleshooting

### Port 3000 Already in Use

```bash
# Use a different port
npm run dev -- -p 3001
```

### Module Not Found Error

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Supabase Connection Error

1. Verify `.env.local` has correct values
2. Check Supabase project is active in dashboard
3. Ensure internet connection
4. Try restarting the dev server

### TypeScript Errors

```bash
# Check for TypeScript errors
npm run type-check

# Fix linting issues
npm run lint -- --fix
```

## Next Steps

1. **Customize Branding**:
   - Edit colors in `tailwind.config.ts`
   - Modify content in `lib/constants.ts`

2. **Add Products**:
   - Use Supabase dashboard or create an admin interface
   - Products must have `approved: true` to show

3. **Setup Payments**:
   - Create Razorpay account
   - Add API credentials to `.env.local`

4. **Deploy**:
   - Follow [DEPLOYMENT.md](./DEPLOYMENT.md)
   - Push to GitHub
   - Connect to Vercel

## Development Workflow

```bash
# Start development server
npm run dev

# Make changes to files (auto-hot-reload)
# Test in browser at http://localhost:3000

# Type checking while developing
npm run type-check

# Check for linting issues
npm run lint

# Format code before committing
npm run format
```

## Production Build

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## Getting Help

- **Documentation**: Read [README.md](./README.md)
- **Quick Start**: Check [QUICKSTART.md](./QUICKSTART.md)
- **Issues**: Open a GitHub issue
- **Email**: support@smartbazaar.com

## Important Notes

⚠️ **Security**:
- Never commit `.env.local` to git (use `.env.example`)
- Keep Supabase service role key secret
- Use strong passwords for databases
- Enable HTTPS in production

💡 **Tips**:
- Use Supabase local development for testing
- Enable browser DevTools for debugging
- Check browser console for errors
- Monitor Network tab for API calls

🚀 **Performance**:
- Clear browser cache if seeing old content
- Use Chrome DevTools Lighthouse for audit
- Monitor database performance in Supabase

---

You're all set! Start developing and creating amazing features! 🎉
