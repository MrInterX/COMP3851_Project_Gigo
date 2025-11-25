import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from 'react-native';
import { supabase } from '../services/supabaseClient';
import { upsertProfile } from '../services/userService';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }
    setLoading(true);
    supabase.auth
      .signInWithPassword({ email, password })
      .then(async ({ data, error }) => {
        if (error) {
          alert(error.message);
          return;
        }
        if (data?.user) {
          // 确保 users 表有一条记录
          await upsertProfile({ id: data.user.id, full_name: data.user.user_metadata?.full_name || '' });
        }
        navigation.navigate('MainHome');
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleLogin = () => {
    navigation.navigate('GoogleEmail');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('MainHome')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Log in to find smart gigs that fit your life.
        </Text>

        {/* Email */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="forexample@gmail.com"
            placeholderTextColor="#C0C0D2"
          />
        </View>

        {/* Password */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="••••••••"
            placeholderTextColor="#C0C0D2"
          />
        </View>

        {/* Remember + Forgot */}
        <View style={styles.rowBetween}>
          <View style={styles.rowCenter}>
            <Switch value={remember} onValueChange={setRemember} />
            <Text style={styles.rememberText}>Remember me</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotText}>Forgot Password ?</Text>
          </TouchableOpacity>
        </View>

        {/* Login 按钮 */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>{loading ? 'LOGGING IN...' : 'LOGIN'}</Text>
        </TouchableOpacity>

        {/* Google 登录 */}
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleLogin}
        >
          <Text style={styles.googleButtonText}>SIGN IN WITH GOOGLE</Text>
        </TouchableOpacity>

        {/* Sign up 导航按钮 */}
        <View style={styles.bottomRow}>
          <Text style={styles.bottomText}>You don&apos;t have an account yet? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.bottomLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const PRIMARY = '#120042';
const PRIMARY_DARK = '#1B0258';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F3FF',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  card: {
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 32,
    elevation: 4,
    position: 'relative',
  },
  skipButton: {
    alignSelf: 'flex-end',
  },
  skipText: {
    color: '#FF8A00',
    fontWeight: '700',
    fontSize: 13,
  },
  title: {
    fontSize: 28,
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
  fieldGroup: {
    marginTop: 24,
  },
  label: {
    fontSize: 13,
    color: PRIMARY,
    marginBottom: 8,
  },
  input: {
    height: 46,
    borderRadius: 16,
    backgroundColor: '#F5F6FA',
    paddingHorizontal: 16,
    fontSize: 14,
    color: PRIMARY_DARK,
  },
  rowBetween: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#7B7B8F',
  },
  forgotText: {
    fontSize: 12,
    color: PRIMARY_DARK,
  },
  loginButton: {
    marginTop: 24,
    height: 48,
    borderRadius: 16,
    backgroundColor: PRIMARY_DARK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  googleButton: {
    marginTop: 12,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#ECE6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButtonText: {
    color: PRIMARY_DARK,
    fontSize: 14,
    fontWeight: '600',
  },
  bottomRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomText: {
    fontSize: 12,
    color: '#7B7B8F',
  },
  bottomLink: {
    fontSize: 12,
    color: '#FF8A00',
    fontWeight: '600',
  },
});
