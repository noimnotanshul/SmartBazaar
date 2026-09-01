# SmartBazaar - Troubleshooting Guide

## Common Issues & Solutions

### Installation Issues

#### Node modules errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

#### Port 3000 already in use
```bash
# Use different port
npm run dev -- -p 3001

# Or kill process on port 3000 (Linux/Mac)
lsof -ti:3000 | xargs kill -9
```

#### Missing .env.local
```bash
cp .env.example .env.local
# Edit with your Supabase credentials
```

### Supabase Connection

#### Connection timeout
```bash
# Check internet connection
# Verify .env.local has correct URL and key
# Check Supabase project status in dashboard
# Restart dev server: npm run dev
```

#### Authentication failing
```bash
# Verify Supabase Auth enabled
# Check email provider settings
# Clear browser cookies/cache
# Try different email
```

#### Database errors
```bash
# Check RLS policies are enabled
# Verify schema.sql was executed
# Check user has row-level access
# Review Supabase logs
```

### Build Issues

#### TypeScript errors
```bash
# Check for type errors
npm run type-check

# Fix linting issues
npm run lint -- --fix

# Rebuild
rm -rf .next
npm run build
```

#### Import errors
```bash
# Check path aliases in tsconfig.json
# Verify @/ points to root
# Clear .next directory
npm run build
```

#### Module not found
```bash
# Install missing dependencies
npm install [package-name]

# Check import paths (case-sensitive)
# Verify file exists
```

### Runtime Issues

#### Blank page
```bash
# Check browser console for errors
# Verify environment variables
# Check network tab for failed requests
# Clear browser cache: Ctrl+Shift+Delete
```

#### Components not rendering
```bash
# Add error boundary
# Check console for React errors
# Verify component imports
# Check data fetching (React Query)
```

#### Slow performance
```bash
# Run: npm run build
# Check bundle size
# Review database indexes
# Optimize images
# Check API response times
```

### Authentication Issues

#### Can't sign up
- Check email is valid
- Verify Supabase Auth provider enabled
- Check email provider settings
- Review Supabase logs for errors

#### Can't sign in
- Verify email and password
- Check user exists in database
- Clear browser cookies
- Try incognito mode

#### Lost password
- Check email in Supabase users table
- Verify user profile created
- Check if account is disabled

### Payment Issues

#### Razorpay not initializing
- Verify API key in .env.local
- Check Razorpay dashboard
- Confirm account is active
- Review browser console errors

#### Payment fails
- Check payment amount
- Verify card details
- Check Razorpay logs
- Ensure HTTPS (production)

### State Management Issues

#### Cart not persisting
```typescript
// Check Zustand store is using persistence
// Verify localStorage is enabled
// Check browser storage in DevTools
```

#### Auth state lost on refresh
```typescript
// Verify token is stored
// Check Supabase session
// Confirm auth provider wrapped app
```

### API Issues

#### 401 Unauthorized
- Token expired: Refresh token
- Wrong credentials: Verify auth
- Missing header: Check Bearer token

#### 403 Forbidden
- Check RLS policies
- Verify user permissions
- Confirm admin status (if admin route)

#### 404 Not Found
- Verify endpoint URL
- Check resource exists
- Verify query parameters

#### 500 Server Error
- Check Supabase logs
- Verify database schema
- Check for SQL errors
- Review function implementation

### Image Issues

#### Images not loading
```bash
# Verify image URL is correct
# Check Supabase storage permissions
# Verify image format supported
# Check CORS settings
```

#### Images not optimizing
```bash
# Use Next.js Image component
# Specify width and height
# Set loading="lazy" for below-fold
# Use priority for LCP images
```

### Database Issues

#### Slow queries
```sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_orders_user_id ON orders(user_id);
```

#### Data not persisting
- Check RLS policies allow insert
- Verify table structure
- Check for foreign key constraints
- Review error messages

#### Sync issues
```bash
# Clear client cache
# Refresh page
# Check real-time subscriptions
# Verify WebSocket connection
```

## Debug Mode

### Enable Verbose Logging
```typescript
// In lib/supabase.ts
const supabase = createClient(url, key, {
  auth: { persistSession: true },
  db: { schema: 'public' },
  realtime: { params: { log: 'debug' } }
})
```

### Browser DevTools
- **Console**: Check errors and warnings
- **Network**: Monitor API calls
- **Application**: View localStorage/cookies
- **Performance**: Profile rendering
- **Sources**: Set breakpoints and debug

### React DevTools
```bash
# Install Chrome extension: React Developer Tools
# Inspect component tree
# View props and state
# Trace renders
```

## Getting Help

### Internal Resources
- Check README.md for documentation
- Review INSTALLATION.md for setup
- See ARCHITECTURE.md for system design
- Check API_ROUTES.md for endpoints

### External Resources
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Community Help
- GitHub Issues: Report bugs
- Discussions: Ask questions
- Stack Overflow: Tag with `smartbazaar`
- Email: support@smartbazaar.com

## Logging & Monitoring

### Application Logs
```bash
# Check Vercel logs
# vercel logs [project-name]

# Check Supabase logs
# Supabase Dashboard > Logs
```

### Error Tracking (Future)
```bash
# When Sentry is configured
# Errors automatically captured
# Review Sentry dashboard
```

## Recovery Procedures

### Reset to Clean State
```bash
# Stop dev server
# Delete .next directory
# Clear node_modules cache
npm run build
npm run dev
```

### Database Reset
```bash
# In Supabase SQL Editor
-- WARNING: This deletes all data!
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- Re-run schema.sql
-- Restore from backup if available
```

### Full Reinstall
```bash
rm -rf node_modules .next .env.local
npm install
cp .env.example .env.local
# Edit .env.local
npm run build
npm run dev
```

---

For issues not covered here, open a GitHub issue with:
- Clear description
- Steps to reproduce
- Error messages
- Your environment info
