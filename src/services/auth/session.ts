import { supabase } from '../../lib/supabase';
import { handleAuthError } from './errors';
import type { AuthResponse } from './types';

export async function getCurrentUser(): Promise<AuthResponse> {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session) return { user: null };

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    return {
      user: user,
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return { user: null };
  }
}

export async function signOut(): Promise<void> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    handleAuthError(error);
  }
}