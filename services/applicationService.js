// services/applicationService.js
import { supabase } from './supabaseClient';

/**
 * 获取当前登录的用户
 */
async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    console.log('getUser error', error);
    throw new Error('User not logged in');
  }

  return data.user;
}

/**
 * 用户申请某个职位
 */
export async function applyToJob(jobId) {
  try {
    const user = await getCurrentUser();

    // 检查是否已申请
    const { data: existing, error: checkError } = await supabase
      .from('applications')
      .select('id')
      .eq('user_id', user.id)
      .eq('job_id', jobId);

    if (checkError) {
      console.log('check existing application error', checkError);
    } else if (existing && existing.length > 0) {
      alert('You have already applied for this job.');
      return;
    }

    const { error } = await supabase.from('applications').insert([
      {
        user_id: user.id,
        job_id: jobId
      }
    ]);

    if (error) {
      console.log('applyToJob error', error);
      alert('Failed to apply. Please try again.');
      return;
    }

    alert('Apply success!');
  } catch (err) {
    console.log('applyToJob catch error', err);
    alert('You must be logged in to apply.');
  }
}

/**
 * 获取某个职位的申请人数
 */
export async function getApplicationCount(jobId) {
  const { count, error } = await supabase
    .from('applications')
    .select('*', { count: 'exact', head: true })
    .eq('job_id', jobId);

  if (error) {
    console.log('getApplicationCount error', error);
    return 0;
  }

  return count ?? 0;
}

/**
 * 获取当前用户的所有申请记录 + 职位信息
 */
export async function getMyApplications() {
  try {
    const user = await getCurrentUser();

    // 查询申请记录
    const { data: apps, error: appsError } = await supabase
      .from('applications')
      .select('id, job_id, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (appsError) {
      console.log('getMyApplications apps error', appsError);
      return [];
    }

    if (!apps || apps.length === 0) {
      return [];
    }

    // 查职位信息
    const jobIds = apps.map((a) => a.job_id);

    const { data: jobs, error: jobsError } = await supabase
      .from('jobs')
      .select('*')
      .in('id', jobIds);

    if (jobsError) {
      console.log('getMyApplications jobs error', jobsError);
      return [];
    }

    // 建立映射
    const jobMap = {};
    jobs.forEach((j) => {
      jobMap[j.id] = j;
    });

    return apps.map((a) => ({
      id: a.id,
      created_at: a.created_at,
      job_id: a.job_id,
      job: jobMap[a.job_id] || null
    }));
  } catch (err) {
    console.log('getMyApplications catch error', err);
    if (err?.message === 'User not logged in') {
      return 'NOT_LOGGED_IN';
    }
    return [];
  }
}
export async function deleteApplication(jobId) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      alert("You must be logged in to delete an application.");
      return false;
    }

    const { error } = await supabase
      .from("applications")
      .delete()
      .eq("user_id", user.id)
      .eq("job_id", jobId);

    if (error) {
      console.log("deleteApplication error:", error);
      alert("Failed to delete application. Please try again.");
      return false;
    }

    alert("Application removed.");
    return true;
  } catch (err) {
    console.log("deleteApplication unexpected error:", err);
    alert("Failed to delete application. Please try again.");
    return false;
  }
}
