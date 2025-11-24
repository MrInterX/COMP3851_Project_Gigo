// screens/MyApplicationsScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { getMyApplications } from '../services/applicationService';

export default function MyApplicationsScreen({ navigation }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const data = await getMyApplications();
      if (data === 'NOT_LOGGED_IN') {
        setLoggedOut(true);
      } else {
        setApplications(data);
      }
    } catch (err) {
      console.log('MyApplicationsScreen loadData error', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.meta}>Loading your applications...</Text>
      </View>
    );
  }

  if (loggedOut) {
    return (
      <View style={styles.center}>
        <Text style={styles.titleText}>You must log in to view your applications.</Text>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.primaryText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!applications || applications.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.titleText}>You have not applied for any jobs yet.</Text>
        <Text style={styles.meta}>Browse jobs and tap "Apply Now" to get started.</Text>
      </View>
    );
  }

  function renderItem({ item }) {
    const job = item.job;

    if (!job) {
      return (
        <View style={styles.card}>
          <Text style={styles.title}>Job not found</Text>
          <Text style={styles.subTitle}>Job ID: {item.job_id}</Text>
        </View>
      );
    }

    const salaryText = job.salary_min
      ? `$${job.salary_min} / ${job.salary_unit || 'hour'}`
      : 'Salary not provided';

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('JobDetail', { jobId: item.job_id })}
      >
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.subTitle}>
          {job.company} · {job.location}
        </Text>
        <Text style={styles.metaLine}>
          {job.category} · {job.job_type}
        </Text>
        <Text style={styles.metaLine}>{salaryText}</Text>
        <Text style={styles.meta}>
          Applied at: {new Date(item.created_at).toLocaleString()}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={applications}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 8 }}
        />
      </View>
    </SafeAreaView>
  );
}

const PRIMARY_DARK = '#1B0258';

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  container: { flex: 1, paddingHorizontal: 16 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: { fontSize: 16, fontWeight: '700', color: PRIMARY_DARK },
  subTitle: { fontSize: 14, color: '#555', marginTop: 4 },
  metaLine: { fontSize: 13, color: '#777', marginTop: 2 },
  meta: { fontSize: 12, color: '#999', marginTop: 8 },
  metaText: { fontSize: 13, color: '#777' },
  titleText: { fontSize: 16, fontWeight: '600', textAlign: 'center', marginBottom: 12 },
  meta: { fontSize: 13, color: '#777', marginTop: 4, textAlign: 'center' },
  primaryButton: {
    marginTop: 16,
    backgroundColor: PRIMARY_DARK,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  primaryText: { color: '#FFFFFF', fontWeight: '700' },
});
