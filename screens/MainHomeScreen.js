// screens/MainHomeScreen.js
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

const PRIMARY = '#120042';
const PRIMARY_DARK = '#1B0258';
const ORANGE = '#FF8A00';

export default function MainHomeScreen({ navigation }) {
  const handleStatPress = (type) => {
    Alert.alert('Filter', `You tapped: ${type}`);
    // 以后可以改成 navigation.navigate('JobList', { type })
  };

  const handleBottomNavPress = (tab) => {
    Alert.alert('Nav', `You tapped: ${tab}`);
    // 以后可以改成真正切换 Tab 或跳转页面
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        {/* 上半部分：可滚动内容 */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 顶部问候 + 头像 */}
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.helloText}>Hello</Text>
              <Text style={styles.nameText}>*****</Text>
            </View>
            <TouchableOpacity
                style={styles.avatar}
                activeOpacity={0.7}
                onPress={() => Alert.alert('Profile', 'You tapped your profile icon')}
                >
                <Text style={styles.avatarText}>*</Text>
            </TouchableOpacity>

          </View>

          {/* Banner 区域 */}
          <View style={styles.banner}>
            <View style={{ flex: 1 }}>
              <Text style={styles.bannerTitle}>
                50% off{'\n'}take any courses
              </Text>
              <TouchableOpacity style={styles.bannerButton}>
                <Text style={styles.bannerButtonText}>Join Now</Text>
              </TouchableOpacity>
            </View>
            {/* 右侧人物占位 */}
            
          </View>

          {/* 搜索区 */}
          <Text style={styles.sectionTitle}>Find Your Job</Text>
          <View style={styles.searchRow}>
            <View style={styles.searchBox}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search job title or keywords"
                placeholderTextColor="#C0C0D2"
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterIcon}>⛭</Text>
            </TouchableOpacity>
          </View>

          {/* 统计卡片（改成按钮） */}
          <View style={styles.statsRow}>
            {/* Remote Job */}
            <TouchableOpacity
              style={[styles.statCard, { backgroundColor: '#E4F4FF' }]}
              onPress={() => handleStatPress('Remote Job')}
              activeOpacity={0.8}
            >
              <Text style={styles.statNumber}>44.5k</Text>
              <Text style={styles.statLabel}>Remote Job</Text>
            </TouchableOpacity>

            <View style={styles.statsColRight}>
              {/* Full Time */}
              <TouchableOpacity
                style={[styles.statCardSmall, { backgroundColor: '#E5DEFF' }]}
                onPress={() => handleStatPress('Full Time')}
                activeOpacity={0.8}
              >
                <Text style={styles.statNumberSmall}>38.9k</Text>
                <Text style={styles.statLabelSmall}>Full Time</Text>
              </TouchableOpacity>

              {/* Part Time */}
              <TouchableOpacity
                style={[styles.statCardSmall, { backgroundColor: '#FFE4C4' }]}
                onPress={() => handleStatPress('Part Time')}
                activeOpacity={0.8}
              >
                <Text style={styles.statNumberSmall}>66.8k</Text>
                <Text style={styles.statLabelSmall}>Part Time</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Job List */}
          <Text style={styles.sectionTitle}>Recent Job List</Text>

          {/* Job 1 */}
<View style={styles.jobCard}>
  <View style={styles.jobLogo}>
    <Text style={styles.jobLogoText}>🍕</Text>
  </View>

  <View style={{ flex: 1 }}>
    <Text style={styles.jobTitle}>Part-Time Kitchen Assistant</Text>
    <Text style={styles.jobCompany}>Pizza Hut · Jurong</Text>
    <Text style={styles.jobSalary}>
      From <Text style={{ fontWeight: '700' }}>$10</Text>/hour
    </Text>

    <View style={styles.jobTagsRow}>
      <View style={styles.jobTag}><Text style={styles.jobTagText}>Entry Level</Text></View>
      <View style={styles.jobTag}><Text style={styles.jobTagText}>Shift</Text></View>
    </View>
  </View>

  <TouchableOpacity style={styles.applyButton}>
    <Text style={styles.applyText}>Apply</Text>
  </TouchableOpacity>
</View>


{/* Job 2 */}
<View style={styles.jobCard}>
  <View style={styles.jobLogo}>
    <Text style={styles.jobLogoText}>📦</Text>
  </View>

  <View style={{ flex: 1 }}>
    <Text style={styles.jobTitle}>Warehouse Packer</Text>
    <Text style={styles.jobCompany}>Shopee · Singapore</Text>
    <Text style={styles.jobSalary}>
      From <Text style={{ fontWeight: '700' }}>$14</Text>/hour
    </Text>

    <View style={styles.jobTagsRow}>
      <View style={styles.jobTag}><Text style={styles.jobTagText}>Full-time</Text></View>
      <View style={styles.jobTag}><Text style={styles.jobTagText}>Night Shift</Text></View>
    </View>
  </View>

  <TouchableOpacity style={styles.applyButton}>
    <Text style={styles.applyText}>Apply</Text>
  </TouchableOpacity>
</View>


{/* Job 3 */}
<View style={styles.jobCard}>
  <View style={styles.jobLogo}>
    <Text style={styles.jobLogoText}>📞</Text>
  </View>

  <View style={{ flex: 1 }}>
    <Text style={styles.jobTitle}>Customer Support Agent</Text>
    <Text style={styles.jobCompany}>Grab · Tanjong Pagar</Text>
    <Text style={styles.jobSalary}>
      From <Text style={{ fontWeight: '700' }}>$18</Text>/hour
    </Text>

    <View style={styles.jobTagsRow}>
      <View style={styles.jobTag}><Text style={styles.jobTagText}>Remote</Text></View>
      <View style={styles.jobTag}><Text style={styles.jobTagText}>Flexible</Text></View>
    </View>
  </View>

  <TouchableOpacity style={styles.applyButton}>
    <Text style={styles.applyText}>Apply</Text>
  </TouchableOpacity>
</View>


{/* Job 4 */}
<View style={styles.jobCard}>
  <View style={styles.jobLogo}>
    <Text style={styles.jobLogoText}>🛒</Text>
  </View>

  <View style={{ flex: 1 }}>
    <Text style={styles.jobTitle}>Retail Assistant</Text>
    <Text style={styles.jobCompany}>FairPrice · Clementi</Text>
    <Text style={styles.jobSalary}>
      From <Text style={{ fontWeight: '700' }}>$11</Text>/hour
    </Text>

    <View style={styles.jobTagsRow}>
      <View style={styles.jobTag}><Text style={styles.jobTagText}>Part-time</Text></View>
      <View style={styles.jobTag}><Text style={styles.jobTagText}>Immediate</Text></View>
    </View>
  </View>

  <TouchableOpacity style={styles.applyButton}>
    <Text style={styles.applyText}>Apply</Text>
  </TouchableOpacity>
</View>


{/* Job 5 */}
<View style={styles.jobCard}>
  <View style={styles.jobLogo}>
    <Text style={styles.jobLogoText}>💻</Text>
  </View>

  <View style={{ flex: 1 }}>
    <Text style={styles.jobTitle}>Junior Web Designer</Text>
    <Text style={styles.jobCompany}>Freelance · Remote</Text>
    <Text style={styles.jobSalary}>
      From <Text style={{ fontWeight: '700' }}>$20</Text>/hour
    </Text>

    <View style={styles.jobTagsRow}>
      <View style={styles.jobTag}><Text style={styles.jobTagText}>Remote</Text></View>
      <View style={styles.jobTag}><Text style={styles.jobTagText}>Project-based</Text></View>
    </View>
  </View>

  <TouchableOpacity style={styles.applyButton}>
    <Text style={styles.applyText}>Apply</Text>
  </TouchableOpacity>
</View>


          <View style={{ height: 80 }} /> {/* 给底部导航留空间 */}
        </ScrollView>

        {/* 底部导航栏 */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.bottomItem}
            onPress={() => handleBottomNavPress('Home')}
          >
            <Text style={styles.bottomIcon}>⌂</Text>
            <Text style={styles.bottomLabel}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomItem}
            onPress={() => handleBottomNavPress('Network')}
          >
            <Text style={styles.bottomIcon}>◎</Text>
            <Text style={styles.bottomLabel}>Network</Text>
          </TouchableOpacity>

          {/* 中间加号按钮 */}
          <TouchableOpacity
            style={styles.centerButtonWrapper}
            onPress={() => handleBottomNavPress('Add')}
          >
            <View style={styles.centerButton}>
              <Text style={styles.centerPlus}>＋</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomItem}
            onPress={() => handleBottomNavPress('Inbox')}
          >
            <Text style={styles.bottomIcon}>✉</Text>
            <Text style={styles.bottomLabel}>Inbox</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomItem}
            onPress={() => handleBottomNavPress('Profile')}
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
  bannerPerson: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerPersonText: {
    fontSize: 10,
    color: '#FFFFFF',
  },

  sectionTitle: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: '700',
    color: PRIMARY_DARK,
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

  jobCard: {
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobLogo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E5F4EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  jobLogoText: {
    fontSize: 20,
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: PRIMARY_DARK,
  },
  jobCompany: {
    marginTop: 2,
    fontSize: 12,
    color: '#7B7B8F',
  },
  jobSalary: {
    marginTop: 4,
    fontSize: 12,
    color: '#7B7B8F',
  },
  jobTagsRow: {
    marginTop: 8,
    flexDirection: 'row',
  },
  jobTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#F5F6FA',
    marginRight: 8,
  },
  jobTagText: {
    fontSize: 11,
    color: '#7B7B8F',
  },
  applyButton: {
    marginLeft: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: ORANGE,
  },
  applyText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

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
