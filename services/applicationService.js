// services/applicationService.js
import { supabase } from "./supabaseClient";

/**
 * 获取当前登录的用户
 */
async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    console.log("getUser error", error);
    throw new Error("User not logged in");
  }

  return data.user;
}

/**
 * 申请职位：向 applications 表插入一条记录
 * - 防止重复申请（同一 user_id + job_id 只能一条）
 */
export async function applyToJob(jobId) {
  try {
    const user = await getCurrentUser();

    // 检查是否已申请
    const { data: existing, error: checkError } = await supabase
      .from("applications")
      .select("id")
      .eq("user_id", user.id)
      .eq("job_id", jobId);

    if (checkError) {
      console.log("applyToJob checkError:", checkError);
      alert("Failed to apply. Please try again.");
      return;
    }

    if (existing && existing.length > 0) {
      alert("You have already applied for this job.");
      return;
    }

    // 插入新申请
    const { error: insertError } = await supabase
      .from("applications")
      .insert({
        user_id: user.id,
        job_id: jobId,
        status: "applied",
      });

    if (insertError) {
      console.log("applyToJob insertError:", insertError);
      alert("Failed to apply. Please try again.");
      return;
    }

    alert("Apply success!");
  } catch (err) {
    console.log("applyToJob catch error:", err);
    if (err?.message === "User not logged in") {
      alert("You must be logged in to apply.");
    } else {
      alert("Failed to apply. Please try again.");
    }
  }
}

/**
 * 获取某个职位的申请人数
 */
export async function getApplicationCount(jobId) {
  try {
    const { count, error } = await supabase
      .from("applications")
      .select("id", { count: "exact", head: true })
      .eq("job_id", jobId);

    if (error) {
      console.log("getApplicationCount error:", error);
      return 0;
    }

    return count || 0;
  } catch (err) {
    console.log("getApplicationCount catch error:", err);
    return 0;
  }
}

/**
 * 获取当前用户的所有申请记录 + 职位信息
 */
export async function getMyApplications() {
  try {
    const user = await getCurrentUser();

    // 查询申请记录
    const { data: apps, error: appsError } = await supabase
      .from("applications")
      .select("id, job_id, created_at, status")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (appsError) {
      console.log("getMyApplications apps error", appsError);
      return [];
    }

    if (!apps || apps.length === 0) {
      return [];
    }

    const jobIds = apps.map((a) => a.job_id);

    // 查询关联的 jobs
    const { data: jobs, error: jobsError } = await supabase
      .from("jobs")
      .select("*")
      .in("id", jobIds);

    if (jobsError) {
      console.log("getMyApplications jobs error", jobsError);
      return [];
    }

    // 建立映射
    const jobMap = {};
    jobs.forEach((j) => {
      jobMap[j.id] = j;
    });

    // apps + job 拼一起
    return apps.map((a) => ({
      id: a.id, // ⚠ application 主键
      created_at: a.created_at,
      status: a.status,
      job_id: a.job_id,
      job: jobMap[a.job_id] || null,
    }));
  } catch (err) {
    console.log("getMyApplications catch error", err);
    if (err?.message === "User not logged in") {
      return "NOT_LOGGED_IN";
    }
    return [];
  }
}

/**
 * 删除当前用户的一条申请记录
 * ❗ 这里按 applications.id 删除，而不是 job_id
 */
export async function deleteApplication(applicationId) {
  try {
    const user = await getCurrentUser();

    const { error } = await supabase
      .from("applications")
      .delete()
      .eq("id", applicationId) // 按 application 主键删
      .eq("user_id", user.id); // 再加一层保护

    if (error) {
      console.log("deleteApplication error:", error);
      alert("Failed to delete application. Please try again.");
      return false;
    }

    alert("Application removed.");
    return true;
  } catch (err) {
    console.log("deleteApplication unexpected error:", err);
    if (err?.message === "User not logged in") {
      alert("You must be logged in to delete an application.");
    } else {
      alert("Failed to delete application. Please try again.");
    }
    return false;
  }
}
