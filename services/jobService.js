// services/jobService.js
import { supabase } from './supabaseClient';

const RECENT_DAYS_MAP = {
  Recent: 3,
  'Last week': 7,
  'Last month': 30,
};

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

export async function getJobsWithFilters({
  search = '',
  category = '',
  subCategory = '',
  jobType = '',
  workplaceType = '',
  experience = '',
  location = '',
  salaryMin = null,
  salaryMax = null,
  lastUpdate = '',
  limit = 50,
} = {}) {
  let query = supabase
    .from('jobs')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(limit);

  if (search) {
    const like = `%${search}%`;
    query = query.or(
      `title.ilike.${like},company.ilike.${like},location.ilike.${like}`,
    );
  }
  if (category) query = query.eq('category', category);
  if (subCategory) query = query.eq('sub_category', subCategory);
  if (jobType) query = query.eq('job_type', jobType);
  if (workplaceType) query = query.eq('workplace_type', workplaceType);
  if (experience) query = query.eq('experience_level', experience);
  if (location) query = query.ilike('location', `%${location}%`);
  if (salaryMin !== null) query = query.gte('salary_min', salaryMin);
  if (salaryMax !== null) query = query.lte('salary_min', salaryMax);

  const daysWindow = RECENT_DAYS_MAP[lastUpdate];
  if (daysWindow) {
    const since = new Date();
    since.setDate(since.getDate() - daysWindow);
    query = query.gte('updated_at', since.toISOString());
  }

  const { data, error } = await query;
  if (error) {
    console.error('getJobsWithFilters error', error);
    return [];
  }
  return data;
}
