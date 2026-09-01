/**
 * SmartBazaar Error Handling
 */

export class SmartBazaarError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500
  ) {
    super(message)
    this.name = 'SmartBazaarError'
  }
}

export class AuthenticationError extends SmartBazaarError {
  constructor(message: string = 'Authentication failed') {
    super('AUTH_ERROR', message, 401)
  }
}

export class AuthorizationError extends SmartBazaarError {
  constructor(message: string = 'You do not have permission') {
    super('AUTH_ERROR', message, 403)
  }
}

export class NotFoundError extends SmartBazaarError {
  constructor(resource: string = 'Resource') {
    super('NOT_FOUND', `${resource} not found`, 404)
  }
}

export class ValidationError extends SmartBazaarError {
  constructor(message: string) {
    super('VALIDATION_ERROR', message, 400)
  }
}

export class DatabaseError extends SmartBazaarError {
  constructor(message: string = 'Database operation failed') {
    super('DATABASE_ERROR', message, 500)
  }
}

export class PaymentError extends SmartBazaarError {
  constructor(message: string = 'Payment processing failed') {
    super('PAYMENT_ERROR', message, 402)
  }
}

/**
 * Handle errors consistently
 */
export function handleError(error: unknown): SmartBazaarError {
  if (error instanceof SmartBazaarError) {
    return error
  }

  if (error instanceof Error) {
    return new SmartBazaarError(
      'UNKNOWN_ERROR',
      error.message,
      500
    )
  }

  return new SmartBazaarError(
    'UNKNOWN_ERROR',
    'An unknown error occurred',
    500
  )
}

/**
 * Log error safely
 */
export function logError(error: unknown, context?: string): void {
  const smartError = handleError(error)
  console.error(`[${smartError.code}] ${context || 'Error'}:`, smartError.message)
}
