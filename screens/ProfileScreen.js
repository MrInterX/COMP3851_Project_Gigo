import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from '../services/supabaseClient';
import { getProfile, upsertProfile } from '../services/userService';

export default function ProfileScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [loggedOut, setLoggedOut] = useState(false);
  const [profile, setProfile] = useState({
    id: '',
    full_name: '',
    location: '',
    about_me: '',
    skills: ''
  });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const { data, error } = await supabase.auth.getUser();

    const user = data?.user;

    if (!user || error) {
      setLoggedOut(true);
      setLoading(false);
      return;
    }

    const { data: profileData } = await getProfile(user.id);
    if (profileData) {
      setProfile(profileData);
    } else {
      setProfile({ ...profile, id: user.id });
    }
    setLoading(false);
  }

  async function saveProfile() {
    if (!profile.id) {
      alert('Please sign in first.');
      return;
    }
    setLoading(true);
    const { error } = await upsertProfile(profile);
    setLoading(false);

    if (error) alert(error.message);
    else alert('Profile saved!');
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (loggedOut) {
    return (
      <View style={styles.center}>
        <Text style={styles.infoText}>Please log in to edit your profile.</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.primaryText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={styles.label}>Full name:</Text>
      <TextInput
        value={profile.full_name}
        onChangeText={(v) => setProfile({ ...profile, full_name: v })}
        style={styles.input}
      />

      <Text style={styles.label}>Location:</Text>
      <TextInput
        value={profile.location}
        onChangeText={(v) => setProfile({ ...profile, location: v })}
        style={styles.input}
      />

      <Text style={styles.label}>About me:</Text>
      <TextInput
        value={profile.about_me}
        onChangeText={(v) => setProfile({ ...profile, about_me: v })}
        style={[styles.input, { height: 80 }]}
        multiline
      />

      <Text style={styles.label}>Skills:</Text>
      <TextInput
        value={profile.skills}
        onChangeText={(v) => setProfile({ ...profile, skills: v })}
        style={styles.input}
      />

      <Button title="Save Profile" onPress={saveProfile} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  infoText: { fontSize: 16, marginBottom: 12 },
  primaryButton: {
    backgroundColor: '#1B0258',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  primaryText: { color: '#fff', fontWeight: '700' },
  label: { marginBottom: 6, fontWeight: '700' },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
});
