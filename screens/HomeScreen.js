// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

export default function HomeScreen({ navigation }) {
  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 顶部 Logo 文本 */}
      <View style={styles.header}>
        <Text style={styles.logoText}>Gigo</Text>
      </View>

      {/* 中间插画区：先用占位，可以后面换成 SVG 或图片 */}
      <View style={styles.illustrationWrapper}>
        <View style={styles.illustrationPlaceholder}>
          <Text style={styles.illustrationText}>[ Illustration ]</Text>
        </View>
      </View>

      {/* 文案区 */}
      <View style={styles.textSection}>
        <Text style={styles.titleLine1}>Smart Gigs.</Text>
        <Text style={styles.titleLine2}>Real Time.</Text>
        <Text style={styles.titleLine2}>Just for You.</Text>

        <Text style={styles.subtitle}>
          Discover part-time jobs that match your skills, schedule, and goals — all in one place.
        </Text>
      </View>

      {/* 底部按钮 */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleGetStarted}>
          <Text style={styles.nextButtonText}>Get Started →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4FF', // 接近 Figma 背景
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 12,
    alignItems: 'flex-end',
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#120042',
  },
  illustrationWrapper: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationPlaceholder: {
    width: '100%',
    height: 260,
    borderRadius: 24,
    backgroundColor: '#FFE4B5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationText: {
    color: '#9A5A00',
    fontSize: 14,
  },
  textSection: {
    flex: 2,
  },
  titleLine1: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FF8A00',
  },
  titleLine2: {
    fontSize: 28,
    fontWeight: '800',
    color: '#120042',
  },
  subtitle: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 20,
    color: '#6B6B7A',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 24,
  },
  nextButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: '#3D1FFF',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
