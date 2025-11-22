// screens/JobDetailScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { getApplicationCount, applyToJob } from '../services/applicationService';
import { getJobById } from '../services/jobService';

export default function JobDetailScreen({ route, navigation }) {
  const { jobId } = route.params;

  const [job, setJob] = useState(null);
  const [applicantsCount, setApplicantsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const jobData = await getJobById(jobId);
      setJob(jobData);

      const count = await getApplicationCount(jobId);
      setApplicantsCount(count);
    } catch (err) {
      console.log('JobDetail loadData error', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleApply() {
    if (applying) return;
    try {
      setApplying(true);
      await applyToJob(jobId);

      const count = await getApplicationCount(jobId);
      setApplicantsCount(count);
    } catch (err) {
      console.log('handleApply error', err);
    } finally {
      setApplying(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Loading job detail...</Text>
      </View>
    );
  }

  if (!job) {
    return (
      <View style={styles.center}>
        <Text>Job not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.subTitle}>{job.industry} · {job.job_type}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Hourly Rate: </Text>
        <Text style={styles.value}>{job.hourly_rate}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Location: </Text>
        <Text style={styles.value}>{job.location}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Duration: </Text>
        <Text style={styles.value}>{job.duration}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Vacancies: </Text>
        <Text style={styles.value}>{job.vacancies}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Applicants: </Text>
        <Text style={styles.value}>{applicantsCount}</Text>
      </View>

      <Text style={styles.sectionTitle}>Job Description</Text>
      <Text style={styles.description}>
        {job.description || 'No description provided.'}
      </Text>

      <TouchableOpacity
        style={[styles.button, applying && styles.buttonDisabled]}
        onPress={handleApply}
        disabled={applying}
      >
        <Text style={styles.buttonText}>
          {applying ? 'Applying...' : 'Apply Now'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  container: { padding: 16, paddingBottom: 32 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  subTitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  infoRow: { flexDirection: 'row', marginBottom: 6 },
  label: { fontWeight: 'bold' },
  value: { flex: 1 },
  sectionTitle: { marginTop: 16, marginBottom: 8, fontWeight: 'bold', fontSize: 16 },
  description: { fontSize: 14, lineHeight: 20, marginBottom: 24 },
  button: { backgroundColor: '#007bff', paddingVertical: 12, borderRadius: 6, alignItems: 'center' },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});
