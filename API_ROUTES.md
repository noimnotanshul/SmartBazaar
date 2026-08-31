# SmartBazaar - API Routes (Future Implementation)

## Authentication Endpoints
```
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
GET    /api/auth/me
```

## Products Endpoints
```
GET    /api/products              # List products with filters
GET    /api/products/:id          # Get single product
POST   /api/products              # Create product (seller only)
PUT    /api/products/:id          # Update product (seller only)
DELETE /api/products/:id          # Delete product (seller only)
GET    /api/products/:id/reviews  # Get product reviews
```

## Orders Endpoints
```
GET    /api/orders                # Get user's orders
GET    /api/orders/:id            # Get order details
POST   /api/orders                # Create order
PUT    /api/orders/:id            # Update order
```

## Bargaining Endpoints
```
POST   /api/bargains              # Start bargain
GET    /api/bargains/:id          # Get bargain status
POST   /api/bargains/:id/offer    # Make offer
POST   /api/bargains/:id/accept   # Accept bargain
```

## Group Buying Endpoints
```
POST   /api/group-buys            # Create group buy
GET    /api/group-buys/:id        # Get group buy details
POST   /api/group-buys/:id/join   # Join group buy
GET    /api/group-buys/share/:code # Access via share link
```

## Gamification Endpoints
```
GET    /api/coins/balance         # Get user coins
POST   /api/coins/claim           # Claim daily bonus
GET    /api/leaderboard           # Get top users
POST   /api/referrals             # Refer friend
```

## Payment Endpoints
```
POST   /api/payments/razorpay/create   # Create payment order
POST   /api/payments/razorpay/verify   # Verify payment
POST   /api/payments/webhook            # Payment webhook
```

## Seller Endpoints
```
GET    /api/seller/dashboard      # Dashboard stats
GET    /api/seller/products       # Seller's products
GET    /api/seller/orders         # Seller's orders
POST   /api/seller/products       # List new product
```

## Admin Endpoints
```
GET    /api/admin/users           # List all users
GET    /api/admin/products        # All products (pending review)
POST   /api/admin/products/:id/approve  # Approve product
DELETE /api/admin/products/:id    # Remove product
GET    /api/admin/orders          # All orders
GET    /api/admin/analytics       # Platform analytics
```

## Live Shopping Endpoints
```
GET    /api/live-streams          # List streams
POST   /api/live-streams          # Create stream
GET    /api/live-streams/:id      # Get stream details
POST   /api/live-streams/:id/chat # Send chat message
```

## Response Format
```json
{
  "success": true,
  "data": { /* response data */ },
  "error": null,
  "message": "Success message"
}
```

## Error Response
```json
{
  "success": false,
  "data": null,
  "error": "ERROR_CODE",
  "message": "Human readable error message"
}
```

## Rate Limiting
- 100 requests per minute per IP
- 1000 requests per hour per authenticated user

## Authentication
- Use JWT tokens in Authorization header
- Format: `Authorization: Bearer <token>`

## CORS Policy
- Development: http://localhost:3000
- Production: Your Vercel domain

---

Note: These endpoints need to be implemented as Next.js API routes in `app/api/`
