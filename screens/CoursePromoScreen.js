import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const H_PADDING = 16;
const BANNER_WIDTH = SCREEN_WIDTH - H_PADDING * 2;
const BANNER_HEIGHT = BANNER_WIDTH * 1.2; // taller to better fill the screen and showcase the image

const BANNERS = [
  require('../assets/images/advertise1.jpg'),
  require('../assets/images/advertise2.jpg'),
  require('../assets/images/advertise3.jpg'),
  require('../assets/images/advertise4.jpg'),
  require('../assets/images/advertise5.jpg'),
];

export default function CoursePromoScreen() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMomentumEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / BANNER_WIDTH);
    setActiveIndex(index);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Course Promos</Text>
        <Text style={styles.subtitle}>Swipe to explore the latest offers</Text>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={BANNER_WIDTH}
        snapToAlignment="start"
        onMomentumScrollEnd={handleMomentumEnd}
        contentContainerStyle={styles.carouselContent}
      >
        {BANNERS.map((src, index) => (
          <View key={index} style={styles.bannerWrapper}>
            <Image source={src} style={styles.banner} resizeMode="cover" />
          </View>
        ))}
      </ScrollView>

      <View style={styles.dotsRow}>
        {BANNERS.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index && styles.dotActive,
            ]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F4F6FF',
    paddingHorizontal: H_PADDING,
    paddingTop: 22,
    paddingBottom: 15,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#1B0258',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: '#6E6E7A',
  },
  carouselContent: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  bannerWrapper: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    borderRadius: 24,
    overflow: 'hidden',
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#EAEAF6',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D5D5E5',
    marginHorizontal: 4,
  },
  dotActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#1B0258',
  },
});
