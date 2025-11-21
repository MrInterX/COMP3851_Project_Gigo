import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image
} from 'react-native';

const PRIMARY = '#120042';
const PRIMARY_DARK = '#1B0258';

export default function SuccessfullyScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>

        {/* 标题 */}
        <Text style={styles.title}>Successfully</Text>
        <Text style={styles.subtitle}>
          Your password has been updated, please change your{'\n'}
          password regularly to avoid this happening
        </Text>

        {/* 插图 */}
        <Image
          source={require('../assets/images/successillustration.png')}
          style={styles.image}
          resizeMode="contain"
        />

        {/* Continue */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.primaryButtonText}>CONTINUE</Text>
        </TouchableOpacity>

        {/* Back to login */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.secondaryButtonText}>BACK TO LOGIN</Text>
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
  image: {
    width: '100%',
    height: 160,
    marginTop: 25,
    marginBottom: 20,
  },
  primaryButton: {
    height: 48,
    backgroundColor: PRIMARY_DARK,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    height: 48,
    backgroundColor: '#ECE6FF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  secondaryButtonText: {
    color: PRIMARY_DARK,
    fontSize: 14,
    fontWeight: '600',
  },
});
