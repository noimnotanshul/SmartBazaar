/**
 * SmartBazaar Constants
 */

export const APP_NAME = 'SmartBazaar'
export const APP_DESCRIPTION = 'The Art of Smart Shopping'

export const COLORS = {
  SAFFRON: '#FF9933',
  INDIA_BLUE: '#2874F0',
  INDIA_GREEN: '#388E3C',
}

export const PAYMENT_METHODS = {
  UPI: 'upi',
  CARD: 'card',
  COD: 'cod',
} as const

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const

export const USER_ROLES = {
  CUSTOMER: 'customer',
  SELLER: 'seller',
  ADMIN: 'admin',
} as const

export const BARGAIN_STATUS = {
  ACTIVE: 'active',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
} as const

export const GROUP_BUY_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  EXPIRED: 'expired',
} as const

export const COIN_REASONS = {
  PURCHASE: 'purchase',
  REFERRAL: 'referral',
  BARGAIN_WIN: 'bargain_win',
  DAILY_LOGIN: 'daily_login',
  SCRATCH_CARD: 'scratch_card',
} as const

export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Books',
  'Sports',
  'Toys',
  'Beauty',
  'Grocery',
] as const

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 20,
  MAX_PER_PAGE: 100,
} as const

export const API = {
  TIMEOUT: 30000,
  RETRY_COUNT: 3,
} as const

export const COIN_REWARDS = {
  DAILY_LOGIN: 10,
  PURCHASE_BASE: 1, // 1 coin per rupee
  BARGAIN_WIN_MIN: 50,
  BARGAIN_WIN_MAX: 200,
  REFERRAL: 100,
  SCRATCH_CARD_MIN: 10,
  SCRATCH_CARD_MAX: 50,
  SPIN_WHEEL_MIN: 20,
  SPIN_WHEEL_MAX: 100,
} as const

export const BARGAINING = {
  MIN_DISCOUNT_PERCENT: 5,
  MAX_DISCOUNT_PERCENT: 40,
  FLOOR_PRICE_PERCENT: 65,
  NEGOTIATION_ROUNDS_MAX: 10,
} as const

export const GROUP_BUYING = {
  MIN_TARGET: 2,
  MAX_TARGET: 100,
  DEFAULT_TARGET: 4,
  DISCOUNT_PERCENT: 15,
  EXPIRY_DAYS: 7,
} as const

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  PHONE_LENGTH: 10,
  PHONE_PATTERN: /^[0-9]{10}$/,
  PINCODE_PATTERN: /^[0-9]{6}$/,
} as const
