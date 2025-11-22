import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

const PRIMARY = '#120042';
const PRIMARY_DARK = '#1B0258';

export default function GoogleEmailScreen({ navigation }) {
  const [googleEmail, setGoogleEmail] = useState('');

  const handleContinue = () => {
    if (!googleEmail) {
      alert('Please enter your Google email');
      return;
    }

    // 以后可以把 googleEmail 通过 params 传给 CheckEmail
    // navigation.navigate('CheckEmail', { email: googleEmail });

    navigation.navigate('CheckEmail');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign in with Google</Text>
        <Text style={styles.subtitle}>
          Please enter your Google email address to continue.
        </Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Google Email</Text>
          <TextInput
            style={styles.input}
            value={googleEmail}
            onChangeText={setGoogleEmail}
            placeholder="youremail@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#C0C0D2"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>CONTINUE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backLinkWrapper}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backLink}>Back</Text>
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
  button: {
    marginTop: 28,
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
  backLinkWrapper: {
    marginTop: 16,
    alignItems: 'center',
  },
  backLink: {
    fontSize: 13,
    color: '#7B7B8F',
  },
});
