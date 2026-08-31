# SmartBazaar - Deployment Guide

## Deploying to Vercel

### Prerequisites
- Vercel account (free)
- GitHub repository
- Supabase project

### Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy SmartBazaar"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add all variables from `.env.example`:
     ```
     NEXT_PUBLIC_SUPABASE_URL
     NEXT_PUBLIC_SUPABASE_ANON_KEY
     SUPABASE_SERVICE_ROLE_KEY
     NEXT_PUBLIC_RAZORPAY_KEY_ID
     RAZORPAY_KEY_SECRET
     NEXT_PUBLIC_APP_URL (set to your Vercel domain)
     ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site is live!

## Database Setup

1. **Create Supabase Project**
   - Sign up at [supabase.com](https://supabase.com)
   - Create new project
   - Copy URL and anon key

2. **Run Schema**
   - Go to Supabase SQL Editor
   - Paste contents of `database/schema.sql`
   - Execute

3. **Enable Authentication**
   - Go to Authentication → Providers
   - Enable Email/Password
   - Enable Google (add credentials)

## Payment Setup

### Razorpay Integration

1. **Create Account**
   - Sign up at [razorpay.com](https://razorpay.com)
   - Verify account

2. **Get Credentials**
   - Settings → API Keys
   - Copy Key ID and Secret
   - Add to environment variables

3. **Test Mode**
   - Use test credentials in development
   - Switch to live in production

## Environment Variables

### Development (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_RAZORPAY_KEY_ID=test-key
RAZORPAY_KEY_SECRET=test-secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Production (Vercel)
```
NEXT_PUBLIC_SUPABASE_URL=production-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=production-key
SUPABASE_SERVICE_ROLE_KEY=production-role-key
NEXT_PUBLIC_RAZORPAY_KEY_ID=live-key
RAZORPAY_KEY_SECRET=live-secret
NEXT_PUBLIC_APP_URL=your-vercel-domain.vercel.app
```

## Monitoring

- **Vercel Analytics**: Built-in performance monitoring
- **Supabase Monitoring**: Database performance and logs
- **Error Tracking**: Set up Sentry or similar

## Maintenance

- Regular backups of Supabase database
- Monitor error logs
- Update dependencies monthly
- Security patches immediately

## Troubleshooting

### Build Fails
- Check Node.js version (18+)
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run type-check`

### Database Connection Issues
- Verify environment variables
- Check Supabase project status
- Ensure IP whitelist allows all (development only)

### Payment Integration Not Working
- Verify Razorpay credentials
- Check test vs live mode
- Review browser console for errors

## Performance Optimization

- Enable image optimization in Vercel
- Use Supabase caching
- Implement CDN for static assets
- Monitor Core Web Vitals

## Scaling

- Vercel auto-scales with demand
- Supabase scales database automatically
- Monitor usage and upgrade plans as needed

## Security Checklist

- [ ] Environment variables not in git
- [ ] Database RLS policies enabled
- [ ] HTTPS enforced
- [ ] Regular security updates
- [ ] API rate limiting configured
- [ ] CORS properly configured

---

For more help, visit:
- [Vercel Docs](https://vercel.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
