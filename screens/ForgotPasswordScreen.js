import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { supabase } from '../services/supabaseClient';

const PRIMARY = '#120042';
const PRIMARY_DARK = '#1B0258';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleReset = () => {
    if (!email) {
      alert('Please enter your email');
      return;
    }
    supabase.auth
      .resetPasswordForEmail(email)
      .then(({ error }) => {
        if (error) {
          alert(error.message);
          return;
        }
        navigation.navigate('CheckEmail');
      })
      .catch((err) => alert(err.message));
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>

        {/* 标题 */}
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          To reset your password, you need your email or mobile{'\n'}
          number that can be authenticated
        </Text>

        {/* 插图 */}
        <Image
          source={require('../assets/images/forgotillustration.png')}
          style={styles.image}
          resizeMode="contain"
        />

        {/* Email */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="example@gmail.com"
            placeholderTextColor="#C0C0D2"
          />
        </View>

        {/* Reset 按钮 */}
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetText}>RESET PASSWORD</Text>
        </TouchableOpacity>


        {/* Back to login */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.backText}>BACK TO LOGIN</Text>
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
    marginTop: 6,
    fontSize: 13,
    textAlign: 'center',
    color: '#7B7B8F',
  },
  image: {
    width: '100%',
    height: 180,
    marginTop: 20,
    marginBottom: 10,
  },
  fieldGroup: { marginTop: 20 },
  label: {
    fontSize: 13,
    color: PRIMARY,
    marginBottom: 8,
  },
  input: {
    height: 46,
    backgroundColor: '#F5F6FA',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 14,
    color: PRIMARY_DARK,
  },
  resetButton: {
    marginTop: 28,
    backgroundColor: PRIMARY_DARK,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  backButton: {
    marginTop: 12,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#ECE6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    color: PRIMARY_DARK,
    fontSize: 14,
    fontWeight: '600',
  },
});
