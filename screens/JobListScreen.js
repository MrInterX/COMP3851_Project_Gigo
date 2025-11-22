import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

import SearchBar from "../components/SearchBar";
import JobCard from "../components/JobCard";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../services/supabaseClient";

// 推荐词
const hotKeywords = ["Waiter", "Part-time jobs", "Barista", "Kitchen Crew"];

export default function JobListScreen({ navigation }) {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // 🟦 读取 Supabase jobs 表
  const fetchJobs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("posted_at", { ascending: false });

    if (error) {
      console.log("❌ Fetch jobs error:", error);
    } else {
      setJobs(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // 🟦 搜索过滤（title / company / location）
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.location.toLowerCase().includes(search.toLowerCase())
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
          <TouchableOpacity
            onPress={() => navigation.navigate("Filter")}
          >
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

        {/* 数据加载中 */}
        {loading && (
          <ActivityIndicator size="large" color="#150B3D" style={{ marginTop: 20 }} />
        )}

        {/* 职位列表 */}
        {!loading && (
          <FlatList
            data={filteredJobs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <JobCard
                title={item.title}
                company={item.company}
                location={item.location}
                type={item.job_type}
                salary={`${item.salary_min} / ${item.salary_unit}`}
                icon="briefcase-outline"
                onPress={() =>
                  navigation.navigate("JobDetail", { jobId: item.id })
                }
              />
            )}
            ListEmptyComponent={
              <Text style={{ textAlign: "center", marginTop: 40, color: "#999" }}>
                No jobs found
              </Text>
            }
            contentContainerStyle={{ paddingBottom: 120, marginTop: 10 }}
          />
        )}
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
