import { supabase } from '../lib/supabase';
import type { ChildFormData, ChildrenFormData } from '../lib/validators';

/**
 * Save or update children in the Supabase database.
 * @param userId - The ID of the user saving the children.
 * @param children - An array of child data to save.
 * @returns A promise resolving to the saved children data.
 */
export async function saveChildren(userId: string, children: ChildrenFormData) {
  console.log("Saving children to Supabase:", children);
  if (!userId) {
    throw new Error('User ID is required to save children.');
  }

  try {
    const { data, error } = await supabase
      .from('children')
      .upsert(
        children.map(child => ({
          user_id: userId,
          full_name: child.fullName,
          birth_date: child.birthDate,
          gender: child.gender,
          id: child.id || undefined, // Allows new entries without an ID
          updated_at: new Date().toISOString(),
        })),
        { onConflict: 'id' } // Updates rows with matching IDs
      )
      .select();

    if (error) {
      console.error('Supabase error while saving children:', error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error saving children:', error);
    throw error;
  }
}

/**
 * Fetch all children for a given user from the Supabase database.
 * @param userId - The ID of the user to fetch children for.
 * @returns A promise resolving to an array of child data.
 */
export async function getChildren(userId: string): Promise<ChildrenFormData> {
  if (!userId) {
    throw new Error('User ID is required to fetch children.');
  }

  try {
    const { data, error } = await supabase
      .from('children')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Supabase error while fetching children:', error);
      throw new Error(error.message);
    }

    return (data || []).map(child => ({
      id: child.id,
      fullName: child.full_name,
      birthDate: child.birth_date,
      gender: child.gender,
    }));
  } catch (error) {
    console.error('Error fetching children:', error);
    throw error;
  }
}

/**
 * Delete a child record from the Supabase database.
 * @param childId - The ID of the child to delete.
 * @returns A promise resolving when the child is deleted.
 */
export async function deleteChild(childId: string) {
  if (!childId) {
    throw new Error('Child ID is required to delete a child.');
  }

  try {
    const { error } = await supabase
      .from('children')
      .delete()
      .eq('id', childId);

    if (error) {
      console.error('Supabase error while deleting child:', error);
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Error deleting child:', error);
    throw error;
  }
}
