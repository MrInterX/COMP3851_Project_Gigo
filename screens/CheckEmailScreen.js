import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

const PRIMARY = '#120042';
const PRIMARY_DARK = '#1B0258';

export default function CheckEmailScreen({ navigation }) {
  const [resetPassword, setResetPassword] = useState('');

  const handleConfirm = () => {
    if (!resetPassword) {
      alert('Please enter your new password');
      return;
    }


    navigation.navigate('Successfully'); 

  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>

        {/* 标题 */}
        <Text style={styles.title}>Check Your Email</Text>

        {/* 说明文字 */}
        <Text style={styles.subtitle}>
          We have sent the reset password to your email address
        </Text>

        {/* 插图 */}
        <Image
          source={require('../assets/images/check.png')}
          style={styles.image}
          resizeMode="contain"
        />

        {/* 输入框：请输入新的 reset 密码 */}
        <View style={styles.fieldGroup}>
          <TextInput
            style={styles.input}
            value={resetPassword}
            onChangeText={setResetPassword}
            placeholder="Enter your reset password"
            placeholderTextColor="#C0C0D2"
            secureTextEntry
          />
        </View>

        {/* 确认按钮 */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmText}>CONFIRM</Text>
        </TouchableOpacity>

        {/* 返回登录 */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.backText}>BACK TO LOGIN</Text>
        </TouchableOpacity>

        {/* Resend row */}
        <View style={styles.resendRow}>
          <Text style={styles.resendText}>You have not received the email? </Text>
          <TouchableOpacity>
            <Text style={styles.resendLink}>Resend</Text>
          </TouchableOpacity>
        </View>

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
    marginTop: 12,
    fontSize: 14,
    color: '#7B7B8F',
    textAlign: 'center',
    lineHeight: 20,
  },
  image: {
    width: '100%',
    height: 180,
    marginTop: 20,
    marginBottom: 10,
  },

  fieldGroup: {
    marginTop: 20,
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

  confirmButton: {
    marginTop: 24,
    height: 48,
    borderRadius: 16,
    backgroundColor: PRIMARY_DARK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmText: {
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
    fontSize: 15,
    fontWeight: '700',
  },

  resendRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resendText: {
    fontSize: 12,
    color: '#7B7B8F',
  },
  resendLink: {
    fontSize: 12,
    color: '#FF8A00',
    fontWeight: '600',
  },
});
