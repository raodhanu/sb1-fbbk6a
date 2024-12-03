import { supabase } from '../../lib/supabase';
import { handleAuthError } from './errors';
import type { SignupFormData } from '../../lib/validators';
import type { AuthResponse } from './types';
import { createProfile } from './profile';

export async function signUp({ email, password, fullName }: SignupFormData): Promise<AuthResponse> {
  try {
    // Check if user exists first
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return {
        user: null,
        error: 'An account with this email already exists',
      };
    }

    // Proceed with signup
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) throw error;
    if (!data.user) throw new Error('Failed to create user account');

    // Create user profile using upsert to handle race conditions
    await createProfile({
      id: data.user.id,
      email: data.user.email!,
      full_name: fullName,
    });

    return {
      user: data.user,
      message: 'Account created successfully! Please check your email to confirm your account.',
    };
  } catch (error) {
    console.error('Sign up error:', error);
    if (error instanceof Error && error.message.includes('User already registered')) {
      return {
        user: null,
        error: 'An account with this email already exists',
      };
    }
    return {
      user: null,
      error: 'Failed to create account. Please try again.',
    };
  }
}