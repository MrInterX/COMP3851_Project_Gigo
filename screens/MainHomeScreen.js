// screens/MainHomeScreen.js
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import JobCard from '../components/JobCard';
import { getJobs } from '../services/jobService';
import remoteJobs from '../data/remoteJobs';
import { supabase } from '../services/supabaseClient';

const PRIMARY = '#120042';
const PRIMARY_DARK = '#1B0258';
const ORANGE = '#FF8A00';
const SOFT_WHITE = '#F8F6FF';
const BANNER_SPACING = 12;
const BANNER_WIDTH = Dimensions.get('window').width - 32;
const BANNER_SNAP = BANNER_WIDTH + BANNER_SPACING;

export default function MainHomeScreen({ navigation }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeBanner, setActiveBanner] = useState(0);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    loadJobs();
    loadUserName();
  }, []);

  async function loadJobs() {
    try {
      setLoading(true);
      const data = await getJobs({ limit: 5 });
      setJobs(data);
    } catch (err) {
      console.log('load home jobs error', err);
    } finally {
      setLoading(false);
    }
  }

  async function loadUserName() {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        setUserName('');
        return;
      }
      const metaName = data.user.user_metadata?.full_name || '';
      const emailName = data.user.email ? data.user.email.split('@')[0] : '';
      setUserName(metaName || emailName);
    } catch (err) {
      console.log('loadUserName error', err);
      setUserName('');
    }
  }

  const handleBrowseRandomJob = () => {
    if (jobs.length) {
      const randomJob = jobs[Math.floor(Math.random() * jobs.length)];
      navigation.navigate('JobDetail', { jobId: randomJob.id });
    } else {
      navigation.navigate('JobList');
    }
  };

  const handleBannerMomentum = (event) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / BANNER_SNAP
    );
    setActiveBanner(index);
  };

  const handleAvatarPress = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        navigation.navigate('Login');
        return;
      }
      navigation.navigate('Profile');
    } catch (err) {
      console.log('avatar press check user error', err);
      navigation.navigate('Login');
    }
  };

  const renderJobs = () => {
    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator />
          <Text style={styles.meta}>Loading recent jobs...</Text>
        </View>
      );
    }

    if (!jobs || jobs.length === 0) {
      return (
        <View style={styles.center}>
          <Text style={styles.meta}>No jobs yet. Try searching.</Text>
        </View>
      );
    }

    return jobs.map((job) => (
      <JobCard
        key={job.id}
        title={job.title}
        company={job.company}
        location={job.location}
        type={job.job_type}
        salary={job.salary_min}
        salaryUnit={job.salary_unit}
        logoUrl={job.logo_url}
        icon="briefcase-outline"
        onPress={() => navigation.navigate('JobDetail', { jobId: job.id })}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 顶部问候 + 头像 */}
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.helloText}>Hello</Text>
              <Text style={styles.nameText}>{userName ? userName : 'there'}</Text>
            </View>
            <TouchableOpacity
              style={styles.avatar}
              activeOpacity={0.7}
              onPress={handleAvatarPress}
            >
              <Ionicons name="person-circle-outline" size={32} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Banner 区域 */}
          <View style={styles.bannerCarousel}>
            <ScrollView
              horizontal
              pagingEnabled
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              snapToInterval={BANNER_SNAP}
              contentContainerStyle={styles.bannerScrollContent}
              onMomentumScrollEnd={handleBannerMomentum}
            >
              <View style={[styles.bannerPrimaryCard, { width: BANNER_WIDTH }]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.bannerTitle}>
                    Find smarter gigs{'\n'}tailored for you
                  </Text>

                  <TouchableOpacity
                    style={styles.bannerButton}
                    onPress={handleBrowseRandomJob}
                  >
                    <Text style={styles.bannerButtonText}>Browse Jobs</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.9}
                style={[
                  styles.bannerCard,
                  styles.bannerAdCard,
                  { width: BANNER_WIDTH },
                ]}
                onPress={() => navigation.navigate('CoursePromo')}
              >
                <View style={styles.bannerAdContent}>
                  <Text style={styles.bannerAdTitle}>50% off</Text>
                  <Text style={styles.bannerAdSubtitle}>take any courses</Text>
                  <View style={styles.bannerAdButton}>
                    <Text style={styles.bannerAdButtonText}>Join Now</Text>
                  </View>
                </View>
                <Image
                  source={require('../assets/images/coursePromoWoman.png')}
                  style={styles.bannerAdImage}
                />
              </TouchableOpacity>
            </ScrollView>

            <View style={styles.bannerDots}>
              {[0, 1].map((index) => (
                <View
                  key={index}
                  style={[
                    styles.bannerDot,
                    activeBanner === index && styles.bannerDotActive,
                  ]}
                />
              ))}
            </View>
          </View>

          {/* 搜索区 */}
          <Text style={styles.sectionTitle}>Find Your Job</Text>
          <View style={styles.searchRow}>
            <TouchableOpacity
              style={styles.searchBox}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('JobList')}
            >
              <Text style={[styles.searchInput, { color: '#C0C0D2' }]}>
                Search job title or keywords
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => navigation.navigate('Specialization')}
            >
              <Ionicons name="options-outline" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* 统计卡片（改成按钮） */}
          <View style={styles.statsRow}>
            <TouchableOpacity
              style={[
                styles.statCard,
                styles.statCardLarge,
                { backgroundColor: '#E4F4FF' },
              ]}
              onPress={() =>
                navigation.navigate('JobList', {
                  presetJobs: remoteJobs,
                })
              }
              activeOpacity={0.8}
            >
              <Text style={styles.statNumber}>44.5k</Text>
              <Text style={styles.statLabel}>Remote Job</Text>
            </TouchableOpacity>

            <View style={styles.statsColRight}>
              <TouchableOpacity
                style={[
                  styles.statCardSmall,
                  styles.statCardSmallSpacer,
                  { backgroundColor: '#DCD5FF' },
                ]}
                onPress={() => navigation.navigate('JobList', { jobType: 'Full-time' })}
                activeOpacity={0.8}
              >
                <Text style={styles.statNumberSmall}>38.9k</Text>
                <Text style={styles.statLabelSmall}>Full Time</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.statCardSmall, { backgroundColor: '#FFE4C4' }]}
                onPress={() => navigation.navigate('JobList', { jobType: 'Part-time' })}
                activeOpacity={0.8}
              >
                <Text style={styles.statNumberSmall}>66.8k</Text>
                <Text style={styles.statLabelSmall}>Part Time</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Job List */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Job List</Text>
            <TouchableOpacity onPress={() => navigation.navigate('JobList')}>
              <Text style={styles.link}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.jobsWrapper}>{renderJobs()}</View>

          <View style={{ height: 80 }} />
        </ScrollView>

        {/* 底部导航栏 */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.bottomItem}
            onPress={() => navigation.navigate('MainHome')}
          >
            <Ionicons name="home-outline" size={22} color={PRIMARY_DARK} />
            <Text style={styles.bottomLabel}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomItem}
            onPress={() => navigation.navigate('JobList')}
          >
            <Ionicons name="briefcase-outline" size={22} color={PRIMARY_DARK} />
            <Text style={styles.bottomLabel}>Jobs</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.centerButtonWrapper}
            onPress={() => navigation.navigate('AI')}
          >
            <View style={styles.centerButton}>
              <Ionicons name="sparkles-outline" size={24} color="#FFF" />
            </View>
            <Text style={[styles.bottomLabel, { marginTop: 6 }]}>Gigo AI</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomItem}
            onPress={() => navigation.navigate('MyApplications')}
          >
            <Ionicons name="document-text-outline" size={22} color={PRIMARY_DARK} />
            <Text style={styles.bottomLabel}>Applied</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomItem}
            onPress={() => navigation.navigate('Messages')}
          >
            <Ionicons name="chatbubbles-outline" size={22} color={PRIMARY_DARK} />
            <Text style={styles.bottomLabel}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5FF',
  },
  inner: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  helloText: {
    fontSize: 20,
    color: '#2F2F46',
    fontWeight: '700',
  },
  nameText: {
    marginTop: 4,
    fontSize: 26,
    fontWeight: '800',
    color: PRIMARY_DARK,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1B0A69',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bannerCarousel: {
    marginTop: 20,
  },
  bannerScrollContent: {
    paddingRight: BANNER_SPACING,
  },
  bannerPrimaryCard: {
    marginRight: BANNER_SPACING,
    borderRadius: 28,
    paddingVertical: 24,
    paddingHorizontal: 22,
    backgroundColor: '#1B0A69',
    flexDirection: 'row',
    shadowColor: '#1B0A69',
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  bannerCard: {
    marginRight: BANNER_SPACING,
    borderRadius: 24,
    padding: 18,
  },
  bannerAdCard: {
    backgroundColor: '#1E0A73',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 28,
    borderRadius: 28,
    shadowColor: '#0F043F',
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 9,
  },
  bannerAdContent: {
    flex: 1,
  },
  bannerAdTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  bannerAdSubtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#E6E0FF',
  },
  bannerAdButton: {
    marginTop: 18,
    paddingHorizontal: 22,
    height: 42,
    borderRadius: 21,
    backgroundColor: ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerAdButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  bannerAdImage: {
    width: 120,
    height: 150,
    marginLeft: 18,
    resizeMode: 'contain',
  },
  bannerDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  bannerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#C2B5E4',
  },
  bannerDotActive: {
    backgroundColor: '#FFFFFF',
  },
  bannerTitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '800',
    color: SOFT_WHITE,
  },
  bannerButton: {
    marginTop: 18,
    paddingVertical: 12,
    paddingHorizontal: 26,
    borderRadius: 24,
    backgroundColor: ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    shadowColor: '#FF8A00',
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  bannerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  sectionTitle: {
    marginTop: 0,
    fontSize: 16,
    fontWeight: '700',
    color: PRIMARY_DARK,
  },
  sectionHeader: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobsWrapper: {
    marginTop: 0,
  },
  link: {
    color: ORANGE,
    fontWeight: '700',
  },

  searchRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBox: {
    flex: 1,
    height: 46,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  searchInput: {
    fontSize: 14,
    color: PRIMARY_DARK,
  },
  filterButton: {
    width: 46,
    height: 46,
    marginLeft: 10,
    borderRadius: 16,
    backgroundColor: PRIMARY_DARK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    color: '#FFFFFF',
    fontSize: 18,
  },

  statsRow: {
    marginTop: 20,
    flexDirection: 'row',
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    justifyContent: 'center',
  },
  statCardLarge: {
    flex: 1.1,
    minHeight: 140,
  },
  statsColRight: {
    flex: 0.95,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  statCardSmall: {
    borderRadius: 20,
    padding: 14,
  },
  statCardSmallSpacer: {
    marginBottom: 16,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: PRIMARY_DARK,
  },
  statLabel: {
    marginTop: 4,
    fontSize: 13,
    color: '#7B7B8F',
  },
  statNumberSmall: {
    fontSize: 16,
    fontWeight: '700',
    color: PRIMARY_DARK,
  },
  statLabelSmall: {
    marginTop: 2,
    fontSize: 12,
    color: '#7B7B8F',
  },

  center: { alignItems: 'center', justifyContent: 'center', paddingVertical: 12 },
  meta: { fontSize: 13, color: '#7B7B8F', marginTop: 6 },

  /* 底部导航栏 */
  bottomNav: {
    height: 64,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    alignItems: 'center',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 6,
  },
  bottomItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomIcon: {
    fontSize: 18,
    color: PRIMARY_DARK,
  },
  bottomLabel: {
    fontSize: 10,
    color: '#7B7B8F',
    marginTop: 2,
  },

  centerButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
  },
  centerButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: PRIMARY_DARK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomLabel: {
    fontSize: 10,
    color: '#7B7B8F',
    marginTop: 2,
  },
});
