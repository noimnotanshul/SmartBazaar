# SmartBazaar - Quick Start

## 🚀 What is SmartBazaar?

SmartBazaar is an innovative e-commerce platform that combines modern technology with Indian shopping culture. It features AI-powered bargaining, gamification, group buying, and a vibrant community.

## ⚡ Quick Links

- [Full Documentation](./README.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Contributing Guide](./CONTRIBUTING.md)
- [Security Policy](./SECURITY.md)
- [API Routes](./API_ROUTES.md)

## 🏃 Getting Started in 5 Minutes

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

```bash
# 1. Clone repository
git clone https://github.com/noimnotanshul/SmartBazaar.git
cd SmartBazaar

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 4. Run development server
npm run dev

# 5. Open browser
# Visit http://localhost:3000
```

## 🔑 Key Features

### 🤝 AI Bargaining
Chat with Bhaiya Ji and negotiate prices in a fun, interactive way.

### 💰 Gamification
Earn SmartCoins through daily login, scratch cards, and spin wheels.

### 👥 Group Buying
Invite friends to share discounts on bulk purchases.

### 📱 Virtual Try-On
See products on yourself using your camera.

### 🔴 Live Shopping
Interactive live streams directly from sellers.

## 📁 Project Structure

```
SmartBazaar/
├── app/              # Next.js pages and routes
├── components/       # React components
├── lib/              # Utilities and API functions
├── database/         # Database schema
├── public/           # Static assets
└── README.md         # Full documentation
```

## 🛠️ Environment Setup

### Supabase Setup
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Copy URL and Anon Key to `.env.local`
4. Run SQL schema from `database/schema.sql`

### Razorpay Setup (Optional)
1. Create account at [razorpay.com](https://razorpay.com)
2. Get API keys from dashboard
3. Add to `.env.local`

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Development build
npm run build
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🐛 Troubleshooting

### Port already in use
```bash
npm run dev -- -p 3001
```

### Database connection error
- Check `.env.local` variables
- Verify Supabase project is active
- Ensure internet connection

### Build errors
```bash
rm -rf node_modules .next
npm install
npm run build
```

## 📞 Support

- Documentation: [README.md](./README.md)
- Issues: [GitHub Issues](https://github.com/noimnotanshul/SmartBazaar/issues)
- Email: support@smartbazaar.com

## 🤝 Contributing

We love contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](./LICENSE) file

---

**Ready to get started?** Follow the Quick Start section above! 🎉
