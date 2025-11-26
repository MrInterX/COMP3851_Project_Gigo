// screens/HomeScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';

const { height } = Dimensions.get('window');
const PRIMARY = '#120042';
const PRIMARY_DARK = '#1B0258';
const ORANGE = '#FF8A00';

export default function HomeScreen({ navigation }) {
  const handleNext = () => navigation.navigate('Login');

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.card}>
        {/* 顶部 Gigo */}
        <View style={styles.header}>
          <Text style={styles.logoText}>Gigo</Text>
        </View>

        {/* 插画区域（占屏幕约 45%） */}
        <View style={styles.illustrationWrapper}>
          <Image
            source={require('../assets/images/landingillustration.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        {/* 文案区域（占屏幕约 30%） */}
        <View style={styles.textSection}>
          <Text style={styles.titleOrange}>Smart Gigs.</Text>
          <Text style={styles.titleDark}>Real Time.</Text>
          <Text style={styles.titleDark}>Just for You.</Text>

          <Text style={styles.subtitle}>
            Discover part-time jobs that match your skills, schedule, and goals — all in one place.
          </Text>
        </View>

        {/* 右下角按钮（固定位置） */}
        <TouchableOpacity style={styles.circleButton} onPress={handleNext}>
          <Text style={styles.circleArrow}>➜</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  card: {
    flex: 1,
    margin: 0,
    borderRadius: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: 22,
    paddingVertical: 18,
  },

  header: {
    alignItems: 'flex-end',
    paddingBottom: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '800',
    color: PRIMARY_DARK,
  },

  illustrationWrapper: {
    height: height * 0.46,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  illustration: {
    width: '100%',
    height: '100%',
  },

  textSection: {
    height: height * 0.30,
    justifyContent: 'flex-start',
    marginTop: 14,
  },
  titleOrange: {
    fontSize: 32,
    fontWeight: '800',
    color: ORANGE,
    marginBottom: 4,
  },
  titleDark: {
    fontSize: 32,
    fontWeight: '800',
    color: PRIMARY_DARK,
    marginBottom: 2,
  },
  subtitle: {
    marginTop: 16,
    fontSize: 15,
    lineHeight: 23,
    color: '#6A6A7A',
  },

  // 固定在右下角
  circleButton: {
    position: 'absolute',
    bottom: 32,
    right: 22,
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: PRIMARY_DARK,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: PRIMARY_DARK,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  circleArrow: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
    marginLeft: 2,
  },
});
