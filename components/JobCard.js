import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function JobCard({
  title,
  company,
  location,
  jobType,
  salaryText,
  onPress,
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.iconCircle}>
        <Ionicons name="briefcase-outline" size={24} color="#4B3F72" />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.meta}>{company}</Text>
        <Text style={styles.meta}>{location}</Text>
        <Text style={styles.salary}>{salaryText}</Text>

        <View style={styles.tagRow}>
          {jobType ? (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{jobType}</Text>
            </View>
          ) : null}
        </View>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3EDFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  meta: {
    marginTop: 2,
    fontSize: 12,
    color: '#666666',
  },
  salary: {
    marginTop: 6,
    fontSize: 13,
    color: '#4B3F72',
    fontWeight: '700',
  },
  tagRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#F5F0FF',
    marginRight: 8,
  },
  tagText: {
    fontSize: 11,
    color: '#4B3F72',
    fontWeight: '600',
  },
});
