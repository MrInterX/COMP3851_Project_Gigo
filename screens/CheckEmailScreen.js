import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';

const PRIMARY = '#120042';
const PRIMARY_DARK = '#1B0258';

export default function CheckEmailScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Check Your Email</Text>

        <Text style={styles.subtitle}>
          We have sent a reset link to your email address.{'\n'}
          Please follow the link to choose a new password.
        </Text>

        <Image
          source={require('../assets/images/check.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.confirmText}>BACK TO LOGIN</Text>
        </TouchableOpacity>

        <View style={styles.resendRow}>
          <Text style={styles.resendText}>Didn&apos;t receive the email? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
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
