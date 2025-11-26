import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../services/supabaseClient';

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    Alert.alert('Saved', 'Your settings have been saved.');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#1B0258" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 26 }} />
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="notifications-outline" size={22} color="#2F2F46" />
            <Text style={styles.rowLabel}>Notifications</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#E7E7EC', true: '#38D13F' }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="moon-outline" size={22} color="#2F2F46" />
            <Text style={styles.rowLabel}>Dark mode</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#E7E7EC', true: '#38D13F' }}
            thumbColor={darkMode ? '#1F1F2E' : '#FFFFFF'}
          />
        </View>

        <TouchableOpacity style={styles.row} activeOpacity={0.8}>
          <View style={styles.rowLeft}>
            <Ionicons name="lock-closed-outline" size={22} color="#2F2F46" />
            <Text style={styles.rowLabel}>Password</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#1B0258" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} activeOpacity={0.8} onPress={handleLogout}>
          <View style={styles.rowLeft}>
            <Ionicons name="log-out-outline" size={22} color="#2F2F46" />
            <Text style={styles.rowLabel}>Logout</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#1B0258" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveBtn} activeOpacity={0.9} onPress={handleSave}>
        <Text style={styles.saveText}>SAVE</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8F8FB',
    paddingHorizontal: 18,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1B0258',
  },
  card: {
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLabel: {
    marginLeft: 12,
    fontSize: 15,
    color: '#2F2F46',
    fontWeight: '600',
  },
  saveBtn: {
    marginTop: 32,
    backgroundColor: '#120042',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#120042',
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  saveText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
    letterSpacing: 0.5,
  },
});
