// components/JobCard.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function JobCard({
  title,
  company,
  location,
  type,
  salary,
  salaryUnit,
  icon = "briefcase-outline",
  logoUrl,
  updatedAt,
  onPress,
}) {
  const salaryLabel = React.useMemo(() => {
    if (salary === undefined || salary === null || salary === "") {
      return "Salary not provided";
    }

    const normalizeUnit = (unit) => {
      const lowered = (unit || "").toLowerCase();
      if (lowered === "month") return "month";
      if (lowered === "hour") return "hour";
      return "";
    };

    if (typeof salary === "string") {
      const trimmed = salary.trim();
      if (/^from\s+/i.test(trimmed)) return trimmed;
      if (trimmed.includes("/")) return `From ${trimmed.replace(/^From\s+/i, "")}`;
      const unitLabel = normalizeUnit(salaryUnit);
      return unitLabel ? `From ${trimmed} / ${unitLabel}` : `From ${trimmed}`;
    }

    const numericValue = Number(salary);
    if (Number.isNaN(numericValue)) {
      return `From ${salary}`;
    }
    const formattedValue = `$${numericValue.toLocaleString()}`;
    const unitLabel = normalizeUnit(salaryUnit);
    return unitLabel ? `From ${formattedValue} / ${unitLabel}` : `From ${formattedValue}`;
  }, [salary, salaryUnit]);

  const leadingNode = (
    <View style={styles.iconWrapper}>
      {logoUrl ? (
        <Image source={{ uri: logoUrl }} style={styles.companyLogo} />
      ) : (
        <Ionicons name={icon} size={20} color="#FFFFFF" />
      )}
    </View>
  );

  const postedLabel = React.useMemo(() => {
    if (!updatedAt) return "Recently updated";
    try {
      const updated = new Date(updatedAt);
      const now = new Date();
      const diffMs = now.getTime() - updated.getTime();
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      if (diffMinutes < 1) return "Just now";
      if (diffMinutes < 60) return `${diffMinutes} min ago`;
      const diffHours = Math.floor(diffMinutes / 60);
      if (diffHours < 24) return `${diffHours} hr${diffHours > 1 ? "s" : ""} ago`;
      const diffDays = Math.floor(diffHours / 24);
      if (diffDays === 1) return "1 day ago";
      return `${diffDays} days ago`;
    } catch {
      return "Recently updated";
    }
  }, [updatedAt]);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardHeader}>
        {leadingNode}

        <View style={{ flex: 1 }}>
          {/* 职位标题 */}
          <Text style={styles.title}>{title}</Text>

          {/* 公司 & 地点 */}
          <Text style={styles.company}>
            {company} · {location}
          </Text>

          {/* 标签 */}
          <View style={styles.tagRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{type}</Text>
            </View>

            <View style={styles.tag}>
              <Text style={styles.tagText}>Entry Level</Text>
            </View>

            <View style={styles.tag}>
              <Text style={styles.tagText}>Shift</Text>
            </View>
          </View>

          {/* 发布时间 和 薪水 */}
          <View style={styles.bottomRow}>
            <Text style={styles.posted}>{postedLabel}</Text>
            <Text style={styles.salaryText}>{salaryLabel}</Text>
          </View>
        </View>
      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E9E9F5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  companyLogo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 17,
    fontWeight: "800",
    color: "#150B3D",
  },
  company: {
    fontSize: 13,
    color: "#7B7B8F",
    marginTop: 2,
  },
  tagRow: {
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 8,
  },
  tag: {
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  tagText: {
    fontSize: 11,
    color: "#7B7B8F",
    fontWeight: "600",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    alignItems: "center",
    width: "100%",
  },
  posted: {
    fontSize: 11,
    color: "#9A9A9A",
  },
  salaryText: {
    fontSize: 15,
    color: "#150B3D",
    fontWeight: "800",
  },
});
