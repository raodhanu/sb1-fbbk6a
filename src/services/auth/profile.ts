import { supabase } from '../../lib/supabase';
import type { UserProfile } from './types';
import { handleAuthError } from './errors';

export async function getProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

export async function createProfile(profile: Omit<UserProfile, 'created_at' | 'updated_at'>) {
  try {
    // First check if profile already exists
    const existingProfile = await getProfile(profile.id);
    if (existingProfile) {
      return existingProfile;
    }

    const { data, error } = await supabase
      .from('profiles')
      .upsert([
        {
          ...profile,
          full_name: profile.full_name || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ], {
        onConflict: 'id',
        ignoreDuplicates: false,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating profile:', error);
    handleAuthError(error);
  }
}

export async function updateProfile(
  userId: string,
  updates: Partial<Omit<UserProfile, 'id' | 'created_at'>>
) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating profile:', error);
    handleAuthError(error);
  }
}

export async function updateFullName(userId: string, fullName: string) {
  return updateProfile(userId, { full_name: fullName });
}