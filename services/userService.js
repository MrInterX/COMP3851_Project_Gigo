import { supabase } from './supabaseClient';

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('id, full_name, location, about_me, skills')
    .eq('id', userId)
    .single();

  return { data, error };
}

export async function upsertProfile(profile) {
  const { data, error } = await supabase
    .from('users')
    .upsert(profile, { onConflict: 'id' })
    .select()
    .single();

  return { data, error };
}