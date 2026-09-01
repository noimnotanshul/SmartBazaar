# SmartBazaar - Architecture & Design

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Browser                        │
│            (Next.js App Router Frontend)                 │
└─────────────────────────────────────────────────────────┘
                         ↓ ↑
                    HTTPS / TLS
                         ↓ ↑
┌─────────────────────────────────────────────────────────┐
│              Vercel Edge Network                         │
│         (Auto-scaling, CDN, Caching)                     │
└─────────────────────────────────────────────────────────┘
                         ↓ ↑
                    API Calls
                         ↓ ↑
┌─────────────────────────────────────────────────────────┐
│                  Supabase Backend                        │
├──────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌──────────────────────────────┐  │
│  │  PostgreSQL DB  │  │  Real-time Subscriptions     │  │
│  │  (ACID, MVCC)   │  │  (WebSocket)                 │  │
│  └─────────────────┘  └──────────────────────────────┘  │
│                                                          │
│  ┌─────────────────┐  ┌──────────────────────────────┐  │
│  │ Auth Service    │  │  Storage (Images)            │  │
│  │ (JWT, OAuth)    │  │  (S3-compatible)             │  │
│  └─────────────────┘  └──────────────────────────────┘  │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Row Level Security (RLS) Policies              │   │
│  │  (Enforce data access at database level)        │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                         ↓ ↑
                    API Calls
                         ↓ ↑
┌─────────────────────────────────────────────────────────┐
│              External Services                          │
│  ┌─────────────────┐         ┌──────────────────────┐  │
│  │  Razorpay       │         │  Email Service       │  │
│  │  (Payments)     │         │  (SendGrid/SMTP)     │  │
│  └─────────────────┘         └──────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Data Flow

### Authentication Flow

```
User Signup/Login
       ↓
  Next.js Auth Form
       ↓
  Supabase Auth API
       ↓
  Generate JWT Token
       ↓
  Store in LocalStorage/Cookie
       ↓
  Include in API Headers
       ↓
  Database RLS Validates Token
       ↓
  Return User Data
```

### Shopping Flow

```
Browse Products (Client State)
       ↓
  Add to Cart (Zustand Store)
       ↓
  Checkout Page
       ↓
  Enter Shipping Address
       ↓
  Select Payment Method
       ↓
  Create Order (Insert to DB)
       ↓
  Process Payment (Razorpay)
       ↓
  Update Order Status
       ↓
  Send Confirmation Email
       ↓
  Display Order Success
```

### Bargaining Flow

```
User Opens Product
       ↓
  Click "Start Bargaining"
       ↓
  Create Bargain Record (DB)
       ↓
  Bhaiya Ji Initial Offer
       ↓
  User Makes Counter-Offer
       ↓
  AI Evaluates (Client-side Logic)
       ↓
  Bhaiya Ji Responds
       ↓
  Accept or Continue?
       ↓
  If Accepted: Update Price in Cart
       ↓
  Save Bargain to DB
```

## Component Architecture

```
App Layout
├── Header
│   ├── Logo
│   ├── Navigation
│   ├── Search
│   └── User Menu
├── Main Content
│   └── Pages (Dynamic)
└── Footer
    ├── Links
    ├── Contact
    └── Social
```

## State Management

### Global State (Zustand)

```typescript
// Auth Store
- user (current logged-in user)
- setUser (update user)
- logout (clear user)

// Cart Store
- items (cart products)
- addItem (add to cart)
- removeItem (remove from cart)
- updateItem (modify quantity)
- clearCart (empty cart)
- getTotalPrice (calculate total)
```

### Local State (React Hooks)

```typescript
// Component-level state using useState
- loading (async operations)
- error (error messages)
- filters (product filtering)
- sortBy (product sorting)
```

### Server State (React Query)

```typescript
// Automatic caching and synchronization
- useQuery() for fetching
- useMutation() for posting
- Automatic refetching
- Background updates
```

## Database Schema

### Key Tables

```
users
├── id (UUID, PK)
├── email
├── name
├── coins
├── referral_code
└── role (customer/seller/admin)

products
├── id (UUID, PK)
├── seller_id (FK → users)
├── name
├── price
├── mrp
├── images
└── approved (boolean)

orders
├── id (UUID, PK)
├── user_id (FK → users)
├── items (JSONB)
├── total
└── status

bargains
├── id (UUID, PK)
├── user_id (FK → users)
├── product_id (FK → products)
├── chat_log (JSONB)
├── final_price
└── status
```

## Security Architecture

### Authentication
- JWT tokens issued by Supabase Auth
- Tokens stored securely in browser
- Tokens validated on every API call

### Authorization
- Row Level Security (RLS) policies on all tables
- Users can only access their own data
- Admin-only functions behind role checks

### Data Protection
- Passwords hashed by Supabase
- Sensitive data encrypted at rest
- HTTPS/TLS in transit
- Environment variables for secrets

## Performance Optimization

### Frontend
- Image optimization with Next.js Image
- Code splitting with dynamic imports
- Lazy loading components
- Caching with React Query

### Backend
- Database indexes on frequently queried columns
- Pagination to limit data transfer
- Connection pooling via Supabase

### Network
- CDN via Vercel edge network
- Compression with gzip
- Caching headers

## Scalability

### Horizontal Scaling
- Vercel auto-scales compute
- Supabase scales database automatically
- No server infrastructure to manage

### Database Scaling
- PostgreSQL handles millions of records
- Indexes optimize query performance
- Connection pooling prevents bottlenecks

## Error Handling

```
User Action
    ↓
Client Validation
    ↓ (if valid)
API Call with Error Boundary
    ↓
Server Processing
    ↓
Database Operation
    ↓ (if error)
Custom Error Class
    ↓
User-friendly Message
    ↓
Logging for debugging
```

## Development Workflow

1. **Local Development**: `npm run dev`
2. **Type Checking**: `npm run type-check`
3. **Linting**: `npm run lint`
4. **Building**: `npm run build`
5. **Testing**: `npm test` (to be implemented)
6. **Deployment**: Push to GitHub → Vercel auto-deploys

## Monitoring & Logging

- **Vercel Analytics**: Performance metrics
- **Supabase Logs**: Database queries and errors
- **Browser Console**: Client-side debugging
- **Error Tracking**: Integration with Sentry (optional)

---

This architecture ensures **scalability**, **security**, and **maintainability** while keeping the codebase simple and focused.
