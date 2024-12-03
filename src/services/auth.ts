import { AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { LoginFormData, SignupFormData } from '../lib/validators';

export { supabase };

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export async function signIn({ email, password }: LoginFormData) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Sign in error:', error);
    if (error instanceof AuthError) {
      switch (error.status) {
        case 400:
          throw new AuthenticationError('Invalid email or password');
        case 429:
          throw new AuthenticationError('Too many login attempts. Please try again later');
        default:
          throw new AuthenticationError('Failed to sign in. Please try again');
      }
    }
    throw new AuthenticationError('An unexpected error occurred');
  }
}

export async function signUp({ email, password, fullName }: SignupFormData) {
  try {
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      throw new AuthenticationError('An account with this email already exists');
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;

    // Create profile entry
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            email: email,
            full_name: fullName,
            created_at: new Date().toISOString(),
          },
        ]);

      if (profileError) {
        console.error('Profile creation error:', profileError);
        // Cleanup: delete auth user if profile creation fails
        await supabase.auth.admin.deleteUser(data.user.id);
        throw new AuthenticationError('Failed to create user profile');
      }
    }

    return {
      ...data,
      message: 'Please check your email to confirm your account',
    };
  } catch (error) {
    console.error('Sign up error:', error);
    if (error instanceof AuthenticationError) {
      throw error;
    }
    if (error instanceof AuthError) {
      switch (error.status) {
        case 400:
          throw new AuthenticationError('Invalid signup data');
        case 422:
          throw new AuthenticationError('Email already registered');
        case 429:
          throw new AuthenticationError('Too many signup attempts. Please try again later');
        default:
          throw new AuthenticationError('Failed to create account. Please try again');
      }
    }
    throw new AuthenticationError('An unexpected error occurred');
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Sign out error:', error);
    throw new AuthenticationError('Failed to sign out');
  }
}

export async function getCurrentUser() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;

    return user;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}