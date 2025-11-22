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
} from 'react-native';
import JobCard from '../components/JobCard';
import { getJobs } from '../services/jobService';

const PRIMARY = '#120042';
const PRIMARY_DARK = '#1B0258';
const ORANGE = '#FF8A00';

export default function MainHomeScreen({ navigation }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
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

    return jobs.map((job) => {
      const salaryText = job.salary_min
        ? `From $${job.salary_min} / ${job.salary_unit || 'hour'}`
        : 'Salary not provided';

      return (
        <JobCard
          key={job.id}
          title={job.title}
          company={job.company}
          location={job.location}
          jobType={job.job_type}
          salaryText={salaryText}
          onPress={() => navigation.navigate('JobDetail', { jobId: job.id })}
        />
      );
    });
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
              <Text style={styles.nameText}>Welcome back</Text>
            </View>
            <TouchableOpacity
              style={styles.avatar}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Profile')}
            >
              <Text style={styles.avatarText}>☺</Text>
            </TouchableOpacity>
          </View>

          {/* Banner 区域 */}
          <View style={styles.banner}>
            <View style={{ flex: 1 }}>
              <Text style={styles.bannerTitle}>
                Find smarter gigs{'\n'}tailored for you
              </Text>
              <TouchableOpacity style={styles.bannerButton} onPress={() => navigation.navigate('JobList')}>
                <Text style={styles.bannerButtonText}>Browse Jobs</Text>
              </TouchableOpacity>
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
              <Text style={styles.filterIcon}>⛭</Text>
            </TouchableOpacity>
          </View>

          {/* 统计卡片（改成按钮） */}
          <View style={styles.statsRow}>
            <TouchableOpacity
              style={[styles.statCard, { backgroundColor: '#E4F4FF' }]}
              onPress={() => navigation.navigate('JobList', { jobType: 'Remote' })}
              activeOpacity={0.8}
            >
              <Text style={styles.statNumber}>44.5k</Text>
              <Text style={styles.statLabel}>Remote Job</Text>
            </TouchableOpacity>

            <View style={styles.statsColRight}>
              <TouchableOpacity
                style={[styles.statCardSmall, { backgroundColor: '#E5DEFF' }]}
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

          {renderJobs()}

          <View style={{ height: 80 }} />
        </ScrollView>

        {/* 底部导航栏 */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.bottomItem}
            onPress={() => navigation.navigate('MainHome')}
          >
            <Text style={styles.bottomIcon}>⌂</Text>
            <Text style={styles.bottomLabel}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomItem}
            onPress={() => navigation.navigate('JobList')}
          >
            <Text style={styles.bottomIcon}>◎</Text>
            <Text style={styles.bottomLabel}>Jobs</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.centerButtonWrapper}
            onPress={() => navigation.navigate('MyApplications')}
          >
            <View style={styles.centerButton}>
              <Text style={styles.centerPlus}>＋</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomItem}
            onPress={() => navigation.navigate('MyApplications')}
          >
            <Text style={styles.bottomIcon}>✉</Text>
            <Text style={styles.bottomLabel}>Applied</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomItem}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.bottomIcon}>☺</Text>
            <Text style={styles.bottomLabel}>Profile</Text>
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
    fontSize: 18,
    color: '#7B7B8F',
  },
  nameText: {
    marginTop: 4,
    fontSize: 24,
    fontWeight: '800',
    color: PRIMARY_DARK,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE4C4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: PRIMARY_DARK,
  },

  banner: {
    marginTop: 20,
    borderRadius: 24,
    backgroundColor: PRIMARY_DARK,
    padding: 18,
    flexDirection: 'row',
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bannerButton: {
    marginTop: 16,
    paddingHorizontal: 16,
    height: 36,
    borderRadius: 18,
    backgroundColor: ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  sectionTitle: {
    marginTop: 24,
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
  statsColRight: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  statCardSmall: {
    borderRadius: 20,
    padding: 12,
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
  centerPlus: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginTop: -2,
  },
});
