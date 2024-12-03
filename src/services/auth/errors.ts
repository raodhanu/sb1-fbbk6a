import { AuthError as SupabaseAuthError } from '@supabase/supabase-js';
import type { AuthError } from './types';

export class AuthenticationError extends Error {
  status?: number;
  code?: string;

  constructor({ message, status, code }: AuthError) {
    super(message);
    this.name = 'AuthenticationError';
    this.status = status;
    this.code = code;
  }
}

export function handleAuthError(error: unknown): never {
  console.error('Authentication error:', error);
  
  if (error instanceof SupabaseAuthError) {
    throw new AuthenticationError({
      message: error.message,
      status: error.status,
      code: error.code,
    });
  }
  
  if (error instanceof Error) {
    throw new AuthenticationError({
      message: error.message,
    });
  }
  
  throw new AuthenticationError({
    message: 'An unexpected error occurred during authentication',
  });
}