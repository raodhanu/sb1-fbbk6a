import type { User } from '@supabase/supabase-js';

export interface AuthResponse {
  user: User | null;
  message?: string;
  error?: string;
}

export interface AuthError {
  message: string;
  status?: number;
  code?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  created_at: string;
  updated_at: string;
}