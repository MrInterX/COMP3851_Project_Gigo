// screens/MyApplicationsScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet
} from 'react-native';

import { getMyApplications } from '../services/applicationService';

export default function MyApplicationsScreen() {
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
        <Text>Loading your applications...</Text>
      </View>
    );
  }

  if (loggedOut) {
    return (
      <View style={styles.center}>
        <Text>You must log in to view your applications.</Text>
      </View>
    );
  }

  if (!applications || applications.length === 0) {
    return (
      <View style={styles.center}>
        <Text>You have not applied for any jobs yet.</Text>
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

    return (
      <View style={styles.card}>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.subTitle}>
          {job.industry} · {job.location}
        </Text>
        <Text style={styles.meta}>
          Applied at: {new Date(item.created_at).toLocaleString()}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={applications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  container: { flex: 1, paddingHorizontal: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    elevation: 2
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  subTitle: { fontSize: 14, color: '#666', marginTop: 4 },
  meta: { fontSize: 12, color: '#999', marginTop: 8 }
});
