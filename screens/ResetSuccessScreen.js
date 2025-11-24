// screens/ResetSuccessScreen.js 
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

export default function ResetSuccessScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        
        {/* 标题 */}
        <Text style={styles.title}>Successful modification</Text>

        {/* 成功插图 */}
        <Image
          source={require('../assets/images/successillustration.png')}
          style={styles.image}
          resizeMode="contain"
        />

        {/* 副标题说明 */}
        <Text style={styles.subtitle}>
          Your password has been updated.{'\n'}
          Please change your password regularly to keep your account safe.
        </Text>

        {/* 回到登录 */}
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

  /* ⭐ 新增插图样式（保持统一风格）⭐ */
  image: {
    width: '100%',
    height: 160,
    marginTop: 24,
    marginBottom: 24,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#7B7B8F',
    textAlign: 'center',
    lineHeight: 20,
  },
  backButton: {
    marginTop: 32,
    height: 48,
    borderRadius: 16,
    backgroundColor: PRIMARY_DARK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
