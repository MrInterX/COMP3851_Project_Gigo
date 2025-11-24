// screens/JobDetailScreen.js
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import { getJobById } from "../services/jobService";
import {
  applyToJob,
  getApplicationCount,
} from "../services/applicationService";

const PRIMARY = "#1B0258";       // 深紫主色
const SCREEN_BG = "#F6F5FA";     // 整体背景
const TEXT_MUTED = "#68687D";
const CARD_BG = "#FFFFFF";

export default function JobDetailScreen({ route, navigation }) {
  const { jobId } = route.params || {};
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applicantsCount, setApplicantsCount] = useState(0);
  const [showFullDesc, setShowFullDesc] = useState(false);

  // 加载数据：职位详情 + 申请人数
  const loadData = useCallback(async () => {
    if (!jobId) return;
    try {
      setLoading(true);
      const jobData = await getJobById(jobId);
      setJob(jobData || null);

      const count = await getApplicationCount(jobId);
      setApplicantsCount(count || 0);
    } catch (err) {
      console.log("JobDetailScreen loadData error:", err);
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  // 初次挂载时加载
  useEffect(() => {
    loadData();
  }, [loadData]);

  // 页面每次获得焦点时重新拉一次（从 MyApplications 删除后返回会刷新人数）
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  async function handleApply() {
    if (!jobId || applying) return;
    try {
      setApplying(true);
      await applyToJob(jobId);
      const count = await getApplicationCount(jobId);
      setApplicantsCount(count || 0);
    } catch (err) {
      console.log("JobDetailScreen apply error:", err);
    } finally {
      setApplying(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color={PRIMARY} />
        <Text style={styles.metaText}>Loading job details...</Text>
      </SafeAreaView>
    );
  }

  if (!job) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.title}>Job not found</Text>
        <Text style={styles.metaText}>
          This job may have been removed or is temporarily unavailable.
        </Text>
      </SafeAreaView>
    );
  }

  const salaryText = job.salary_min
    ? `From $${job.salary_min}/${job.salary_unit || "hour"}`
    : "Salary not provided";

  const locationText = job.location || "Location not specified";
  const postedText = getPostedText(job.posted_at);

  let applicantsLabel = "No applicants yet";
  if (applicantsCount === 1) applicantsLabel = "1 applicant";
  else if (applicantsCount > 1) applicantsLabel = `${applicantsCount} applicants`;

  const description =
    job.description || "No description provided for this role.";

  const descriptionPreview =
    description.length > 260 && !showFullDesc
      ? description.slice(0, 260).trimEnd() + "..."
      : description;

  const requirementsLines =
    job.requirements
      ?.split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0) || [];

  return (
    <SafeAreaView style={styles.safe}>
      {/* 顶部只保留返回按钮（去掉右上角三个点） */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.roundIcon}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color={PRIMARY} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 顶部大卡片：Logo + 标题 + 公司 & 地点 & 发布时间 */}
        <View style={styles.heroCard}>
          {/* Logo 圆形 */}
          <View style={styles.logoWrapper}>
            {job.logo_url ? (
              <Image
                source={{ uri: job.logo_url }}
                style={styles.logoImg}
                resizeMode="cover"
              />
            ) : (
              <Text style={styles.logoInitial}>
                {job.company?.[0] || "G"}
              </Text>
            )}
          </View>

          {/* 职位标题 */}
          <Text style={styles.jobTitle}>{job.title}</Text>

          {/* 公司 · 地点 · 发布时间 */}
          <View style={styles.metaRow}>
            <Text style={styles.metaStrong}>{job.company}</Text>
            <View style={styles.dot} />
            <Text style={styles.metaStrong}>{locationText}</Text>
            <View style={styles.dot} />
            <Text style={styles.metaStrong}>{postedText}</Text>
          </View>
        </View>

        {/* 中间内容区域 */}
        <View style={styles.body}>
          {/* Salary 行 + Applicants 简要信息 */}
          <View style={styles.rowBetween}>
            <Text style={styles.bodyLabel}>Salary</Text>
            <Text style={styles.bodyValue}>{salaryText}</Text>
          </View>
          <Text style={[styles.smallMuted, { marginTop: 6 }]}>
            {applicantsLabel}
          </Text>

          {/* Job Description */}
          <View style={{ marginTop: 26 }}>
            <Text style={styles.sectionTitle}>Job Description</Text>
            <Text style={styles.sectionBody}>{descriptionPreview}</Text>

            {description.length > 260 && (
              <TouchableOpacity
                style={styles.readMoreBtn}
                onPress={() => setShowFullDesc((v) => !v)}
              >
                <Text style={styles.readMoreText}>
                  {showFullDesc ? "Show less" : "Read more"}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Requirements */}
          <View style={{ marginTop: 30 }}>
            <Text style={styles.sectionTitle}>Requirements</Text>
            {requirementsLines.length > 0 ? (
              requirementsLines.map((line, idx) => (
                <View key={idx} style={styles.reqRow}>
                  <Text style={styles.reqDot}>•</Text>
                  <Text style={styles.reqText}>{line}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.sectionBody}>
                No specific requirements have been provided.
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* 底部大按钮区域 */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.applyBtn, applying && { opacity: 0.7 }]}
          onPress={handleApply}
          disabled={applying}
        >
          <Text style={styles.applyText}>
            {applying ? "APPLYING..." : "APPLY NOW"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/**
 * 把 posted_at 转成 “4 days ago / Today / Recently posted”
 */
function getPostedText(postedAt) {
  if (!postedAt) return "Recently posted";
  try {
    const posted = new Date(postedAt);
    const now = new Date();
    const diffMs = now.getTime() - posted.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  } catch {
    return "Recently posted";
  }
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },
  center: {
    flex: 1,
    backgroundColor: SCREEN_BG,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  roundIcon: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: CARD_BG,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  heroCard: {
    marginTop: 12,
    marginHorizontal: 16,
    backgroundColor: CARD_BG,
    borderRadius: 28,
    paddingTop: 40,
    paddingBottom: 28,
    paddingHorizontal: 24,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  logoWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F0F0FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  logoImg: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  logoInitial: {
    fontSize: 34,
    fontWeight: "700",
    color: PRIMARY,
  },
  jobTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: PRIMARY,
    textAlign: "center",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  metaStrong: {
    fontSize: 15,
    fontWeight: "600",
    color: PRIMARY,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: PRIMARY,
    marginHorizontal: 10,
  },

  body: {
    marginTop: 26,
    paddingHorizontal: 24,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  bodyLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: PRIMARY,
  },
  bodyValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
  },
  smallMuted: {
    fontSize: 14,
    color: TEXT_MUTED,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: PRIMARY,
    marginBottom: 6,
  },
  sectionBody: {
    fontSize: 15,
    lineHeight: 22,
    color: TEXT_MUTED,
  },
  readMoreBtn: {
    marginTop: 18,
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: "#E6DDFF",
  },
  readMoreText: {
    fontSize: 15,
    fontWeight: "600",
    color: PRIMARY,
  },
  reqRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  reqDot: {
    fontSize: 20,
    lineHeight: 22,
    color: PRIMARY,
    marginRight: 6,
  },
  reqText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: TEXT_MUTED,
  },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingBottom: 22,
    paddingTop: 10,
    backgroundColor: "rgba(246,245,250,0.96)",
  },
  applyBtn: {
    height: 56,
    borderRadius: 20,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },
  applyText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: PRIMARY,
    marginBottom: 8,
    textAlign: "center",
  },
  metaText: {
    fontSize: 15,
    color: TEXT_MUTED,
    textAlign: "center",
  },
});
