import React from 'react';
import { SafeAreaView, Image, StyleSheet } from 'react-native';

export default function CoursePromoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/images/advertise.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
