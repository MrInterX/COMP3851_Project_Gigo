// services/jobService.js
import { supabase } from './supabaseClient';

export async function getJobById(id) {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.log('getJobById error', error);
    return null;
  }

  return data;
}
