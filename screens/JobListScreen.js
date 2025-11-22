import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import SearchBar from "../components/SearchBar";
import JobCard from "../components/JobCard";
import { Ionicons } from "@expo/vector-icons";

// 推荐搜索关键词
const hotKeywords = ["Waiter", "Part-time jobs", "Barista", "Kitchen Crew"];

export default function JobListScreen({ navigation }) {
  const [search, setSearch] = useState("");

  // mock 数据（无数据库也可运行）
  const mockJobs = [
    {
      id: 1,
      title: "Waiter",
      company: "Marina Bay Sands",
      location: "Singapore",
      job_type: "Full time",
      salary_min: 18000,
      salary_max: 23000,
    },
    {
      id: 2,
      title: "Kitchen Crew",
      company: "Jollibee",
      location: "Singapore",
      job_type: "Part time",
      salary_min: 12000,
      salary_max: 15000,
    },

      {
    id: 3,
    title: "Part-Time Service Crew",
    company: "Starbucks",
    location: "Bugis, Singapore",
    job_type: "Part time",
    salary_min: 12000,
    salary_max: 16000,
  },
  {
    id: 4,
    title: "Retail Assistant",
    company: "UNIQLO",
    location: "Tampines",
    job_type: "Full time",
    salary_min: 18000,
    salary_max: 22000,
  },
  {
    id: 5,
    title: "Warehouse Packer",
    company: "Shopee",
    location: "Changi",
    job_type: "Shift",
    salary_min: 14000,
    salary_max: 20000,
  },

  ];

  const filteredJobs = mockJobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={{ flex: 1 }}>
        {/* 顶部搜索栏 */}
        <View style={styles.searchRow}>
          <SearchBar
            value={search}
            onChangeText={setSearch}
            placeholder="Search job title or keywords"
            style={{ flex: 1 }}
          />

          <TouchableOpacity onPress={() => navigation.navigate("Filter")}>
            <Ionicons name="options-outline" size={28} color="#150B3D" />
          </TouchableOpacity>
        </View>

        {/* 推荐搜索 */}
        <Text style={styles.hotTitle}>Recommended searches</Text>
        <View style={styles.hotRow}>
          {hotKeywords.map((keyword, index) => (
            <TouchableOpacity
              key={index}
              style={styles.hotTag}
              onPress={() => setSearch(keyword)}
            >
              <Text style={styles.hotText}>{keyword}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 职位列表 */}
        <View style={{ flex: 1 }}>
          <FlatList
            data={filteredJobs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <JobCard
                title={item.title}
                company={item.company}
                location={item.location}
                type={item.job_type}
                salary={`$${item.salary_min / 1000}k - $${item.salary_max / 1000}k`}
                icon="briefcase-outline"
                onPress={() => navigation.navigate("JobDetail", { jobId: item.id })}
              />
            )}
            ListEmptyComponent={
              <Text style={{ textAlign: "center", marginTop: 40, color: "#999" }}>
                No jobs found
              </Text>
            }
            contentContainerStyle={{ paddingBottom: 120 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 16,
    paddingHorizontal: 18,
    marginTop: 10,
  },
  hotTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    paddingHorizontal: 18,
    color: "#150B3D",
  },
  hotRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
    paddingHorizontal: 18,
  },
  hotTag: {
    backgroundColor: "#F4F4F4",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 14,
  },
  hotText: {
    color: "#150B3D",
    fontWeight: "600",
  },
});
