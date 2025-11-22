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
  icon = "briefcase-outline",
  onPress,
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {/* 左侧 Logo */}
      <View style={styles.logoBox}>
        <Ionicons name={icon} size={26} color="#3C3C3C" />
      </View>

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
          <Text style={styles.posted}>Posted 30 minutes ago</Text>
          <Text style={styles.salary}>
            From <Text style={{ fontWeight: "700" }}>{salary}</Text>/hour
          </Text>
        </View>
      </View>

      {/* 右上 Bookmark */}
      <Ionicons name="bookmark-outline" size={22} color="#8E8E8E" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  logoBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
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
    marginBottom: 6,
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
    marginTop: 4,
    alignItems: "center",
  },
  posted: {
    fontSize: 11,
    color: "#9A9A9A",
  },
  salary: {
    fontSize: 13,
    color: "#150B3D",
    fontWeight: "600",
  },
});
