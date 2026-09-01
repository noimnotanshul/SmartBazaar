/**
 * SmartBazaar API Configuration
 */

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  API_TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'),
  RETRY_COUNT: parseInt(process.env.NEXT_PUBLIC_API_RETRY_COUNT || '3'),
}

export const SUPABASE_CONFIG = {
  URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
}

export const PAYMENT_CONFIG = {
  RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
}

export const FEATURE_FLAGS = {
  ENABLE_VIRTUAL_TRYON: process.env.NEXT_PUBLIC_ENABLE_VIRTUAL_TRYON === 'true',
  ENABLE_LIVE_SHOPPING: process.env.NEXT_PUBLIC_ENABLE_LIVE_SHOPPING === 'true',
  ENABLE_GROUP_BUYING: process.env.NEXT_PUBLIC_ENABLE_GROUP_BUYING === 'true',
  ENABLE_BARGAINING: process.env.NEXT_PUBLIC_ENABLE_BARGAINING === 'true',
}

export function validateConfig(): void {
  if (!SUPABASE_CONFIG.URL || !SUPABASE_CONFIG.ANON_KEY) {
    throw new Error('Missing Supabase configuration')
  }
}
