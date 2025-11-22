import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { supabase } from '../services/supabaseClient';
import { getProfile, upsertProfile } from '../services/userService';

export default function ProfileScreen() {
  const [loading, setLoading] = useState(true);
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
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await getProfile(user.id);
      if (data) {
        setProfile(data);
      }
    }
    setLoading(false);
  }

  async function saveProfile() {
    setLoading(true);
    const { data, error } = await upsertProfile(profile);
    setLoading(false);

    if (error) alert(error.message);
    else alert('Profile saved!');
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Full name:</Text>
      <TextInput
        value={profile.full_name}
        onChangeText={(v) => setProfile({ ...profile, full_name: v })}
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />

      <Text>Location:</Text>
      <TextInput
        value={profile.location}
        onChangeText={(v) => setProfile({ ...profile, location: v })}
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />

      <Text>About me:</Text>
      <TextInput
        value={profile.about_me}
        onChangeText={(v) => setProfile({ ...profile, about_me: v })}
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />

      <Text>Skills:</Text>
      <TextInput
        value={profile.skills}
        onChangeText={(v) => setProfile({ ...profile, skills: v })}
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />

      <Button title="Save Profile" onPress={saveProfile} />
    </View>
  );
}
