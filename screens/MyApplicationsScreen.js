// screens/MyApplicationsScreen.js
import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  getMyApplications,
  deleteApplication,
} from "../services/applicationService";

const PRIMARY = "#1B0258";
const SCREEN_BG = "#F6F5FA";
const CARD_BG = "#FFFFFF";
const TEXT_MUTED = "#7A7A90";

export default function MyApplicationsScreen({ navigation }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const result = await getMyApplications();

      if (result === "NOT_LOGGED_IN") {
        setNotLoggedIn(true);
        setApplications([]);
      } else {
        setNotLoggedIn(false);
        setApplications(result || []);
      }
    } catch (err) {
      console.log("MyApplicationsScreen loadApplications error:", err);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadApplications();
    setRefreshing(false);
  }, []);

  const handleViewJob = (jobId) => {
    if (!jobId) return;
    navigation.navigate("JobDetail", { jobId });
  };

  const handleDeleteApplication = (jobId) => {
    if (!jobId) return;

    Alert.alert(
      "Remove application?",
      "Are you sure you want to remove this application? You may need to apply again later if you change your mind.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            const ok = await deleteApplication(jobId);
            if (ok) {
              setApplications((prev) =>
                prev.filter((item) => item.job_id !== jobId)
              );
            }
          },
        },
      ]
    );
  };

  // 各种状态渲染
  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color={PRIMARY} />
        <Text style={styles.metaText}>Loading your applications...</Text>
      </SafeAreaView>
    );
  }

  if (notLoggedIn) {
    return (
      <SafeAreaView style={styles.safe}>
        <Header navigation={navigation} />
        <View style={styles.stateWrapper}>
          <View style={styles.stateIconCircle}>
            <Ionicons name="lock-closed-outline" size={32} color={PRIMARY} />
          </View>
          <Text style={styles.stateTitle}>Login required</Text>
          <Text style={styles.stateBody}>
            Please log in to view and manage your job applications.
          </Text>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.primaryBtnText}>Go to Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!applications || applications.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <Header navigation={navigation} />
        <View style={styles.stateWrapper}>
          <View style={styles.stateIconCircle}>
            <Ionicons name="document-outline" size={32} color={PRIMARY} />
          </View>
          <Text style={styles.stateTitle}>No applications yet</Text>
          <Text style={styles.stateBody}>
            You haven&apos;t applied for any jobs yet. Start browsing and apply
            for your first job.
          </Text>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => navigation.navigate("JobList")}
          >
            <Text style={styles.primaryBtnText}>Find a job</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Header navigation={navigation} />
      <FlatList
        data={applications}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[PRIMARY]}
          />
        }
        renderItem={({ item }) => <ApplicationCard
          item={item}
          onView={handleViewJob}
          onDelete={handleDeleteApplication}
        />}
      />
    </SafeAreaView>
  );
}

/**
 * 头部标题
 */
function Header({ navigation }) {
  return (
    <View style={styles.headerRow}>
      <TouchableOpacity
        style={styles.headerIcon}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={22} color={PRIMARY} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>My Applications</Text>
      <View style={{ width: 44 }} />{/* 占位，让标题居中 */}
    </View>
  );
}

/**
 * 单个申请卡片
 */
function ApplicationCard({ item, onView, onDelete }) {
  const job = item.job || {};
  const appliedDate = item.created_at
    ? new Date(item.created_at).toLocaleDateString()
    : "Recently";

  const salaryText = job.salary_min
    ? `$${job.salary_min}/${job.salary_unit || "hour"}`
    : "Not provided";

  return (
    <View style={styles.card}>
      {/* 标题行 */}
      <View style={styles.cardTopRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {job.title || "Untitled job"}
          </Text>
          <Text style={styles.cardCompany} numberOfLines={1}>
            {job.company || "Unknown company"}
          </Text>
        </View>

        <View style={styles.statusChip}>
          <Ionicons
            name="checkmark-circle-outline"
            size={16}
            color="#0D9488"
            style={{ marginRight: 4 }}
          />
          <Text style={styles.statusText}>Applied</Text>
        </View>
      </View>

      {/* 信息行：地点 / 类型 / 薪资 */}
      <View style={styles.infoRow}>
        <View style={styles.infoChip}>
          <Ionicons
            name="location-outline"
            size={14}
            color={PRIMARY}
            style={{ marginRight: 4 }}
          />
          <Text style={styles.infoText} numberOfLines={1}>
            {job.location || "Location"}
          </Text>
        </View>
        {job.job_type ? (
          <View style={styles.infoChip}>
            <Ionicons
              name="time-outline"
              size={14}
              color={PRIMARY}
              style={{ marginRight: 4 }}
            />
            <Text style={styles.infoText} numberOfLines={1}>
              {job.job_type}
            </Text>
          </View>
        ) : null}
        <View style={styles.infoChip}>
          <Ionicons
            name="cash-outline"
            size={14}
            color={PRIMARY}
            style={{ marginRight: 4 }}
          />
          <Text style={styles.infoText} numberOfLines={1}>
            {salaryText}
          </Text>
        </View>
      </View>

      {/* 申请时间 + 按钮 */}
      <View style={styles.cardBottomRow}>
        <Text style={styles.appliedText}>Applied on {appliedDate}</Text>

        <View style={styles.cardBtnRow}>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => onView(item.job_id)}
          >
            <Text style={styles.secondaryBtnText}>View</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => onDelete(item.job_id)}
          >
            <Ionicons
              name="trash-outline"
              size={16}
              color="#FFFFFF"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.deleteBtnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
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
  },
  metaText: {
    marginTop: 8,
    fontSize: 14,
    color: TEXT_MUTED,
    textAlign: "center",
  },

  // Header
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: CARD_BG,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",
    color: PRIMARY,
  },

  // 状态页
  stateWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  stateIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#E4DCFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  stateTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: PRIMARY,
    textAlign: "center",
  },
  stateBody: {
    marginTop: 8,
    fontSize: 14,
    color: TEXT_MUTED,
    textAlign: "center",
    lineHeight: 20,
  },
  primaryBtn: {
    marginTop: 20,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 18,
    backgroundColor: PRIMARY,
  },
  primaryBtnText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  // 列表
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  card: {
    backgroundColor: CARD_BG,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: PRIMARY,
  },
  cardCompany: {
    marginTop: 2,
    fontSize: 13,
    color: TEXT_MUTED,
  },
  statusChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#CCFBF1",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0F766E",
  },

  infoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  infoChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#EEEAFD",
    marginRight: 6,
    marginBottom: 6,
  },
  infoText: {
    fontSize: 12,
    color: PRIMARY,
    maxWidth: 120,
  },

  cardBottomRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appliedText: {
    fontSize: 12,
    color: TEXT_MUTED,
  },
  cardBtnRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  secondaryBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: PRIMARY,
    marginRight: 8,
  },
  secondaryBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: PRIMARY,
  },
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "#DC2626",
  },
  deleteBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
