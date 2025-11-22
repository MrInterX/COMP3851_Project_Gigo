// services/jobService.js
import { supabase } from './supabaseClient';

export async function getJobs({ search, category, jobType, limit } = {}) {
  let query = supabase
    .from('jobs')
    .select('*')
    .order('posted_at', { ascending: false });

  if (category) {
    query = query.eq('category', category);
  }

  if (jobType) {
    query = query.eq('job_type', jobType);
  }

  if (search) {
    const pattern = `%${search}%`;
    query = query.or(
      `title.ilike.${pattern},company.ilike.${pattern},location.ilike.${pattern}`,
    );
  }

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.log('getJobs error', error);
    return [];
  }

  return data || [];
}

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
