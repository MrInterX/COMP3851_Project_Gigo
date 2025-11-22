import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const PRIMARY = '#120042';
const PRIMARY_DARK = '#1B0258';

export default function NewPasswordScreen({ navigation }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleConfirm = () => {
    if (!password || !confirm) {
      alert('Please fill in both fields');
      return;
    }

    if (password !== confirm) {
      alert('Passwords do not match');
      return;
    }

    // 未来这里接 Supabase 的 update password
    navigation.navigate('ResetSuccess');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        {/* 标题 */}
        <Text style={styles.title}>Create New Password</Text>
        <Text style={styles.subtitle}>
          Your new password must be different from your old password.
        </Text>

        {/* New Password */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor="#C0C0D2"
          />
        </View>

        {/* Confirm Password */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={confirm}
            onChangeText={setConfirm}
            placeholder="••••••••"
            placeholderTextColor="#C0C0D2"
          />
        </View>

        {/* Confirm 按钮 */}
        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>CONFIRM</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F3FF',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: PRIMARY_DARK,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#7B7B8F',
    textAlign: 'center',
  },
  fieldGroup: { marginTop: 24 },
  label: {
    fontSize: 13,
    color: PRIMARY,
    marginBottom: 6,
  },
  input: {
    height: 46,
    backgroundColor: '#F5F6FA',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  button: {
    marginTop: 30,
    height: 48,
    borderRadius: 16,
    backgroundColor: PRIMARY_DARK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
