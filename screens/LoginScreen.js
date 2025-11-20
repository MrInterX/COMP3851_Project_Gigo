// screens/LoginScreen.js
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

export default function LoginScreen() {
  const [email, setEmail] = useState('forexample@gmail.com');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleLogin = () => {
    // TODO: 这里之后接 Supabase Auth 登录逻辑
    console.log('login with', email, password);
  };

  const handleGoogleLogin = () => {
    // TODO: 之后可以做 social login 或直接留空
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        {/* 标题 */}
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Log in to find smart gigs that fit your life.</Text>

        {/* Email */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
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
          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password ?</Text>
          </TouchableOpacity>
        </View>

        {/* Login 按钮 */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>

        {/* Google 登录按钮 */}
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
          <Text style={styles.googleButtonText}>SIGN IN WITH GOOGLE</Text>
        </TouchableOpacity>

        {/* 底部 Sign up 区域 */}
        <View style={styles.bottomRow}>
          <Text style={styles.bottomText}>You don&apos;t have an account yet? </Text>
          <TouchableOpacity>
            <Text style={styles.bottomLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const CARD_BG = '#FFFFFF';
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
    backgroundColor: CARD_BG,
    paddingHorizontal: 24,
    paddingVertical: 32,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
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
