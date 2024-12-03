import { createClient } from '@supabase/supabase-js';
import { env } from '../config/env';

// Create Supabase client for client-side operations
export const supabase = createClient(env.supabase.url, env.supabase.anonKey);

// Create admin client for secure server-side operations
export const adminClient = createClient(env.supabase.url, env.supabase.serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});