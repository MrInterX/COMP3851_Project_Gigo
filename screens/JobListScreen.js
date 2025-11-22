// screens/JobListScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';
import { Ionicons } from '@expo/vector-icons';
import { getJobs } from '../services/jobService';

export default function JobListScreen({ navigation, route }) {
  const initialCategory = route.params?.category;
  const initialJobType = route.params?.jobType;
  const initialKeyword = route.params?.keyword || '';

  const [search, setSearch] = useState(initialKeyword);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, [search, initialCategory, initialJobType]);

  async function load() {
    try {
      setLoading(true);
      const data = await getJobs({
        search: search?.trim() || undefined,
        category: initialCategory,
        jobType: initialJobType,
      });
      setJobs(data);
    } catch (err) {
      console.log('load jobs error', err);
    } finally {
      setLoading(false);
    }
  }

  const renderJobs = () => {
    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator />
          <Text style={styles.meta}>Loading jobs...</Text>
        </View>
      );
    }

    if (!jobs || jobs.length === 0) {
      return (
        <View style={styles.center}>
          <Text style={styles.emptyTitle}>No jobs found</Text>
          <Text style={styles.meta}>Try another keyword or adjust filters.</Text>
          <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate('Filter')}>
            <Text style={styles.secondaryText}>Open Filters</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return jobs.map((job) => {
      const salaryText = job.salary_min
        ? `From $${job.salary_min} / ${job.salary_unit || 'hour'}`
        : 'Salary not provided';

      return (
        <JobCard
          key={job.id}
          title={job.title}
          company={job.company}
          location={job.location}
          jobType={job.job_type}
          salaryText={salaryText}
          onPress={() => navigation.navigate('JobDetail', { jobId: job.id })}
        />
      );
    });
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
    >
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
      {renderJobs()}

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
  center: { alignItems: 'center', justifyContent: 'center', paddingVertical: 20 },
  meta: { marginTop: 6, fontSize: 13, color: '#777' },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  secondaryBtn: {
    marginTop: 14,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: '#F5F0FF',
  },
  secondaryText: { color: '#4B3F72', fontWeight: '700' },
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
