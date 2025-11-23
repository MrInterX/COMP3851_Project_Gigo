import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

export default function CoursePromoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Course Promo</Text>
      <Text style={styles.subtitle}>Content coming soon.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5FF',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1B0258',
  },
  subtitle: {
    marginTop: 12,
    fontSize: 16,
    color: '#7B7B8F',
    textAlign: 'center',
  },
});
