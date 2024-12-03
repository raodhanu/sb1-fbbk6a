import { supabase } from '../../lib/supabase';
import { handleAuthError } from './errors';
import type { LoginFormData } from '../../lib/validators';
import type { AuthResponse } from './types';

export async function signIn({ email, password }: LoginFormData): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        return {
          user: null,
          error: 'Invalid email or password',
        };
      }
      throw error;
    }
    
    return {
      user: data.user,
      message: 'Successfully signed in',
    };
  } catch (error) {
    handleAuthError(error);
  }
}