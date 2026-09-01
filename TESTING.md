# SmartBazaar - Testing Guide

## Manual Testing Checklist

### Authentication
- [ ] Signup with email
- [ ] Verify email confirmation
- [ ] Login with credentials
- [ ] Logout functionality
- [ ] Profile update
- [ ] Password reset
- [ ] Google OAuth (when configured)

### Product Browsing
- [ ] View product list
- [ ] Filter by category
- [ ] Filter by price range
- [ ] Filter by rating
- [ ] Search functionality
- [ ] Sort by price/rating
- [ ] View product details
- [ ] View product images
- [ ] Read reviews

### Shopping Cart
- [ ] Add product to cart
- [ ] Update quantity
- [ ] Remove from cart
- [ ] View cart total
- [ ] Proceed to checkout
- [ ] Clear cart

### Checkout
- [ ] Enter shipping address
- [ ] Select payment method
- [ ] Review order
- [ ] Place order
- [ ] Order confirmation
- [ ] View order in profile

### Bargaining
- [ ] Open bargain chat
- [ ] Make first offer
- [ ] Receive AI response
- [ ] Make counter-offer
- [ ] Accept deal
- [ ] Price updates in cart
- [ ] Chat history

### Gamification
- [ ] Claim daily login bonus
- [ ] Play scratch card
- [ ] Spin wheel
- [ ] Earn coins from purchase
- [ ] View coin balance
- [ ] Use coins for discount

### UI/UX
- [ ] Responsive mobile view
- [ ] Responsive tablet view
- [ ] Dark mode toggle
- [ ] Light mode toggle
- [ ] Loading states
- [ ] Error messages
- [ ] Navigation flow

## Automated Testing Setup

### Unit Tests
```bash
# Run unit tests (when Jest is configured)
npm test

# Watch mode
npm test -- --watch

# Coverage report
npm test -- --coverage
```

### Integration Tests
```bash
# Run integration tests (when configured)
npm run test:integration
```

### E2E Tests
```bash
# Run end-to-end tests (when configured)
npm run test:e2e
```

## Test Data

### Test User Accounts
```
Email: test@smartbazaar.com
Password: Test@123456

Email: admin@smartbazaar.com
Password: Admin@123456
```

### Test Products
- Product ID: 1 - Sample Electronics
- Product ID: 2 - Sample Fashion
- Product ID: 3 - Sample Home

## Performance Testing

### Lighthouse
```bash
# Run Lighthouse audit in Chrome
# DevTools > Lighthouse > Generate report

# Target scores:
# Performance: 90+
# Accessibility: 90+
# Best Practices: 90+
# SEO: 90+
```

### Load Testing
- Use tools like k6, JMeter
- Simulate 100+ concurrent users
- Monitor response times
- Check database performance

## Browser Compatibility

### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers
- [ ] Chrome Mobile
- [ ] Safari iOS
- [ ] Samsung Internet
- [ ] Firefox Mobile

## Accessibility Testing

- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast
- [ ] Focus indicators
- [ ] Form labels
- [ ] Alt text for images
- [ ] ARIA attributes

## Security Testing

- [ ] SQL injection attempts
- [ ] XSS attempts
- [ ] CSRF protection
- [ ] Rate limiting
- [ ] Authentication bypass
- [ ] Authorization checks
- [ ] Data encryption

## Common Test Scenarios

### User Journey 1: Browse and Purchase
1. Sign up → Browse products → Filter → Add to cart → Checkout → Pay → View order

### User Journey 2: Bargain and Save
1. Login → Find product → Start bargaining → Negotiate → Accept → Add to cart → Save coins

### User Journey 3: Group Buy
1. Explore products → Create group buy → Share link → Invite friends → Reach target → Checkout

### User Journey 4: Gamification
1. Login → Claim daily bonus → Play scratch card → Spin wheel → Use coins → Purchase

## Debugging Tips

### Browser Console
```javascript
// Check auth state
console.log(useAuthStore.getState())

// Check cart
console.log(useCartStore.getState())

// Network tab
// Check API calls and responses
```

### Supabase Studio
- Monitor database queries
- Check authentication logs
- View real-time subscriptions
- Inspect storage files

### Network Inspection
- Open DevTools → Network tab
- Monitor API calls
- Check response status and timing
- Verify error responses

## Reported Bugs

Format for reporting:
```
Title: [Bug] Descriptive title
Description: What went wrong
Steps: How to reproduce
Expected: What should happen
Actual: What actually happened
Browser/Device: Your setup
Screenshot: If applicable
```

---

For more help, see CONTRIBUTING.md
