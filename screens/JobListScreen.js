// screens/JobListScreen.js
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import SearchBar from '../components/SearchBar';
import FilterButton from '../components/FilterButton';
import JobCard from '../components/JobCard';
import { Ionicons } from '@expo/vector-icons';

export default function JobListScreen({ navigation }) {
  const [search, setSearch] = useState("");

  // 🟦 临时数据（让页面能跑）
  const jobs = [
    {
      id: 1,
      title: "Part-Time Service Crew",
      company: "Starbucks",
      location: "Bugis, Singapore",
      type: "Part-time",
      salary: "$12 / Hour",
      icon: "cafe-outline",
    },
    {
      id: 2,
      title: "Warehouse Assistant",
      company: "Lazada",
      location: "Malaysia",
      type: "Full-time",
      salary: "$2000 / Month",
      icon: "cube-outline",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* 🔍 Search Row */}
      <View style={styles.searchRow}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search job title or keywords"
          style={{ flex: 1 }}
        />

        <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
          <Ionicons name="options-outline" size={28} color="#4B3F72" />
        </TouchableOpacity>
      </View>

      {/* 🔥 Title */}
      <Text style={styles.sectionTitle}>Recommended Jobs</Text>

      {/* 📌 Job Cards */}
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          title={job.title}
          company={job.company}
          location={job.location}
          type={job.type}
          salary={job.salary}
          icon={job.icon}
          onPress={() => navigation.navigate("Search")} // 示例跳转
        />
      ))}

      {/* 🔗 Specialization 跳转 */}
      <TouchableOpacity
        style={styles.specialButton}
        onPress={() => navigation.navigate("Specialization")}
      >
        <Text style={styles.specialText}>Explore Specializations →</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: '#FFFFFF',
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },
  specialButton: {
    marginTop: 20,
    paddingVertical: 14,
    backgroundColor: "#F5F0FF",
    borderRadius: 12,
  },
  specialText: {
    textAlign: "center",
    color: "#4B3F72",
    fontSize: 16,
    fontWeight: "600",
  }
});
