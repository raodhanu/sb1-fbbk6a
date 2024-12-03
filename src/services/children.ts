import { supabase } from '../lib/supabase';
import type { ChildFormData, ChildrenFormData } from '../lib/validators';

export async function saveChildren(userId: string, children: ChildrenFormData) {
  try {
    const { data, error } = await supabase
      .from('children')
      .upsert(
        children.map(child => ({
          user_id: userId,
          full_name: child.fullName,
          birth_date: child.birthDate,
          gender: child.gender,
          id: child.id,
          updated_at: new Date().toISOString(),
        })),
        { onConflict: 'id' }
      )
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving children:', error);
    throw error;
  }
}

export async function getChildren(userId: string) {
  try {
    const { data, error } = await supabase
      .from('children')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return (data || []).map(child => ({
      id: child.id,
      fullName: child.full_name,
      birthDate: child.birth_date,
      gender: child.gender,
    })) as ChildrenFormData;
  } catch (error) {
    console.error('Error fetching children:', error);
    throw error;
  }
}

export async function deleteChild(childId: string) {
  try {
    const { error } = await supabase
      .from('children')
      .delete()
      .eq('id', childId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting child:', error);
    throw error;
  }
}