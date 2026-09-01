# SmartBazaar - Performance Optimization Guide

## Frontend Performance

### Image Optimization

```typescript
// ✅ Good: Using Next.js Image
import Image from 'next/image'

<Image
  src="/product.jpg"
  alt="Product"
  width={400}
  height={400}
  priority={false}
  loading="lazy"
/>

// ❌ Bad: Using HTML img tag
<img src="/product.jpg" alt="Product" />
```

### Code Splitting

```typescript
// ✅ Good: Dynamic import with loading state
const BargainChat = dynamic(
  () => import('@/components/bargaining/bargain-chat'),
  { loading: () => <p>Loading...</p> }
)

// Components loaded on-demand
```

### Caching Strategy

```typescript
// ✅ Good: Cache products for 5 minutes
const { data } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
  staleTime: 1000 * 60 * 5, // 5 minutes
  gcTime: 1000 * 60 * 10,   // Keep in memory 10 mins
})
```

## Database Performance

### Query Optimization

```sql
-- ✅ Good: Use indexes
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- ✅ Good: Only select needed columns
SELECT id, name, price FROM products;

-- ❌ Bad: SELECT *
SELECT * FROM products;
```

### Connection Pooling

- Supabase automatically uses connection pooling
- Max connections handled by Supabase
- No manual configuration needed

## API Performance

### Pagination

```typescript
// ✅ Good: Paginate large datasets
const { data: products } = await supabase
  .from('products')
  .select('*')
  .range(0, 19) // First 20 items
  .order('created_at', { ascending: false })

// Implement infinite scroll or pagination UI
```

### Request Batching

```typescript
// ✅ Good: Fetch related data together
const [products, reviews] = await Promise.all([
  fetchProducts(),
  fetchReviews(),
])

// ❌ Bad: Sequential requests
const products = await fetchProducts()
const reviews = await fetchReviews()
```

## Bundle Size Optimization

### Analyze Bundle

```bash
# Install analyzer
npm install --save-dev @next/bundle-analyzer

# Create next.config.js plugin
# View: .next/analyze/index.html
```

### Tree Shaking

```typescript
// ✅ Good: Named imports (tree-shakeable)
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// ❌ Bad: Import entire modules
import * as UI from '@/components/ui'
```

## Rendering Performance

### Memoization

```typescript
// ✅ Good: Memoize expensive components
const ProductCard = memo(function ProductCard({ product }) {
  return <Card>...</Card>
})

// ✅ Good: Memoize callbacks
const handleClick = useCallback(() => {
  // Expensive operation
}, [dependencies])
```

### Virtual Scrolling

```typescript
// ✅ Good: For large lists
// Use react-window or similar
// Only render visible items
// Improves performance dramatically
```

## Network Optimization

### Compression

- Vercel automatically enables gzip compression
- Next.js minifies CSS and JavaScript
- Images optimized for web

### Caching Headers

```javascript
// next.config.js
headers: async () => [
  {
    source: '/api/:path*',
    headers: [
      { key: 'Cache-Control', value: 'public, max-age=3600' },
    ],
  },
]
```

### Content Delivery

- Vercel Edge Network CDN
- Automatic geographic distribution
- Cached near users globally

## Monitoring Performance

### Web Vitals

```typescript
// ✅ Monitor Core Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getLCP(console.log) // Largest Contentful Paint
getFID(console.log) // First Input Delay
getCLS(console.log) // Cumulative Layout Shift
```

### Metrics to Track

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **TTFB** (Time to First Byte): < 600ms

## Performance Checklist

- [ ] Images optimized with Next.js Image
- [ ] Code splitting implemented
- [ ] React Query caching configured
- [ ] Database indexes created
- [ ] Pagination implemented
- [ ] Bundle size < 100KB (gzipped)
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals passing
- [ ] No console errors/warnings
- [ ] Load time < 3 seconds

## Tools

### Browser DevTools
- Lighthouse audit
- Network tab analysis
- Performance profiler

### External Tools
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [GTmetrix](https://gtmetrix.com/)

## Benchmarks

Target metrics for SmartBazaar:

```
First Contentful Paint (FCP): < 1.5s
Largest Contentful Paint (LCP): < 2.5s
Time to Interactive (TTI): < 3.5s
Total Blocking Time (TBT): < 150ms
Cumulative Layout Shift (CLS): < 0.1
```

---

Regular performance audits ensure optimal user experience!
