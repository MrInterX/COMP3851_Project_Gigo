import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../services/supabaseClient';
import { getProfile, upsertProfile } from '../services/userService';

export default function ProfileScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [profile, setProfile] = useState({
    id: '',
    full_name: '',
    location: '',
    about_me: '',
    skills: '',
  });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    setLoading(true);
    const { data, error } = await supabase.auth.getUser();

    const user = data?.user;

    if (!user || error) {
      setLoggedOut(true);
      setLoading(false);
      return;
    }

    const { data: profileData } = await getProfile(user.id);
    if (profileData) {
      setProfile(profileData);
    } else {
      setProfile({ ...profile, id: user.id });
    }

    setLoading(false);
  }

  async function saveProfile() {
    if (!profile.id) {
      alert('Please sign in first.');
      return;
    }
    setSaving(true);
    const { error } = await upsertProfile(profile);
    setSaving(false);
    setShowEdit(false);

    if (error) alert(error.message);
    else alert('Profile saved!');
  }

  const displayName = profile.full_name || 'Your Name';
  const displayLocation = profile.location || 'Add your location';
  const aboutText =
    profile.about_me ||
    'Tell people about yourself: your background, goals, and what kind of gigs you like.';
  const skillChips = useMemo(() => {
    if (profile.skills) {
      return profile.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    }
    return ['Leadership', 'Teamwork', 'Visioner', 'Target oriented', 'Consistent'];
  }, [profile.skills]);

  const workExperiences = [
    {
      id: 'exp-1',
      title: 'Manager',
      company: 'Amazon Inc',
      dateRange: 'Jan 2015 - Feb 2022',
      duration: '7 years',
    },
  ];

  const educations = [
    {
      id: 'edu-1',
      title: 'Information Technology',
      school: 'University of Oxford',
      dateRange: 'Sep 2010 - Aug 2013',
      duration: '3 years',
    },
  ];

  const languages = ['English', 'German', 'Spanish', 'Mandarin', 'Italian'];

  const awards = [
    {
      id: 'awd-1',
      title: 'Wireless Symposium (RWS)',
      subtitle: 'Young Scientist',
      year: '2014',
    },
  ];

  const resume = {
    name: 'Jamet kudasi – CV – UI/UX Designer',
    size: '867 Kb',
    date: '14 Feb 2022 at 11:30 am',
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color={PRIMARY} />
        <Text style={styles.infoText}>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  if (loggedOut) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.infoText}>Please log in to edit your profile.</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.primaryText}>Go to Login</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerCard}>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconCircle}>
              <Ionicons name="share-outline" size={20} color="#F8F6FF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.navigate('Settings')}>
              <Ionicons name="settings-outline" size={20} color="#F8F6FF" />
            </TouchableOpacity>
          </View>

          <View style={styles.headerProfileRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarInitial}>{displayName.charAt(0)}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{displayName}</Text>
              <Text style={styles.location}>{displayLocation}</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View>
              <Text style={styles.statNumber}>28</Text>
              <Text style={styles.statLabel}>Follower</Text>
            </View>
            <View>
              <Text style={styles.statNumber}>124</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <TouchableOpacity style={styles.editBtn} onPress={() => setShowEdit(true)}>
              <Text style={styles.editText}>Edit profile</Text>
              <Ionicons name="create-outline" size={16} color="#FFF" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>
        </View>

        <Section title="About me" icon="person-circle-outline" onActionPress={() => setShowEdit(true)}>
          <Text style={styles.bodyText}>{aboutText}</Text>
        </Section>

        <Section title="Work experience" icon="briefcase-outline" actionIcon="add">
          {workExperiences.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSubtitle}>{item.company}</Text>
                <Text style={styles.itemMeta}>
                  {item.dateRange} · {item.duration}
                </Text>
              </View>
              <Ionicons name="create-outline" size={18} color={ACCENT} />
            </View>
          ))}
        </Section>

        <Section title="Education" icon="school-outline" actionIcon="add">
          {educations.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSubtitle}>{item.school}</Text>
                <Text style={styles.itemMeta}>
                  {item.dateRange} · {item.duration}
                </Text>
              </View>
              <Ionicons name="create-outline" size={18} color={ACCENT} />
            </View>
          ))}
        </Section>

        <Section title="Skill" icon="flash-outline">
          <View style={styles.chipWrap}>
            {skillChips.map((chip, idx) => (
              <View key={`${chip}-${idx}`} style={styles.chip}>
                <Text style={styles.chipText}>{chip}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity>
            <Text style={styles.seeMore}>See more</Text>
          </TouchableOpacity>
        </Section>

        <Section title="Language" icon="ribbon-outline">
          <View style={styles.chipWrap}>
            {languages.map((lang) => (
              <View key={lang} style={styles.chip}>
                <Text style={styles.chipText}>{lang}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Appreciation" icon="trophy-outline" actionIcon="add">
          {awards.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                <Text style={styles.itemMeta}>{item.year}</Text>
              </View>
              <Ionicons name="create-outline" size={18} color={ACCENT} />
            </View>
          ))}
        </Section>

        <Section title="Resume" icon="document-text-outline" actionIcon="add">
          <View style={styles.resumeRow}>
            <View style={styles.pdfBadge}>
              <Text style={styles.pdfText}>PDF</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>{resume.name}</Text>
              <Text style={styles.itemMeta}>
                {resume.size} · {resume.date}
              </Text>
            </View>
            <Ionicons name="trash-outline" size={18} color="#DC2626" />
          </View>
        </Section>

        <View style={{ height: 40 }} />
      </ScrollView>

      <Modal visible={showEdit} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit profile</Text>
              <TouchableOpacity onPress={() => setShowEdit(false)}>
                <Ionicons name="close" size={24} color={PRIMARY} />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Full name</Text>
            <TextInput
              value={profile.full_name}
              onChangeText={(v) => setProfile({ ...profile, full_name: v })}
              style={styles.input}
              placeholder="Your name"
            />

            <Text style={styles.label}>Location</Text>
            <TextInput
              value={profile.location}
              onChangeText={(v) => setProfile({ ...profile, location: v })}
              style={styles.input}
              placeholder="City, Country"
            />

            <Text style={styles.label}>About me</Text>
            <TextInput
              value={profile.about_me}
              onChangeText={(v) => setProfile({ ...profile, about_me: v })}
              style={[styles.input, { height: 80 }]}
              multiline
              placeholder="A short intro about yourself"
            />

            <Text style={styles.label}>Skills (comma separated)</Text>
            <TextInput
              value={profile.skills}
              onChangeText={(v) => setProfile({ ...profile, skills: v })}
              style={styles.input}
              placeholder="Design, Figma, Communication"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowEdit(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveBtn, saving && { opacity: 0.7 }]}
                onPress={saveProfile}
                disabled={saving}
              >
                <Text style={styles.saveText}>{saving ? 'Saving...' : 'Save'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F4F4F8' },
  scrollContent: { padding: 16, paddingBottom: 32 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#F4F4F8' },
  infoText: { fontSize: 15, color: '#6B6B7A', marginTop: 8, textAlign: 'center' },
  primaryButton: {
    backgroundColor: '#1B0258',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 12,
  },
  primaryText: { color: '#fff', fontWeight: '700' },

  headerCard: {
    backgroundColor: '#120042',
    borderRadius: 28,
    padding: 18,
    paddingBottom: 22,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FF8A00',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarInitial: { fontSize: 28, fontWeight: '800', color: '#FFF' },
  name: { fontSize: 20, fontWeight: '800', color: '#FFF' },
  location: { marginTop: 4, fontSize: 14, color: '#E5E1FF' },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  statNumber: { fontSize: 18, fontWeight: '800', color: '#FFF' },
  statLabel: { fontSize: 12, color: '#C4BEFF' },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#27155A',
    borderRadius: 14,
  },
  editText: { color: '#FFF', fontWeight: '700' },

  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginTop: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1B0258', marginLeft: 8 },
  sectionAction: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,138,0,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyText: { marginTop: 12, fontSize: 14, color: '#68687D', lineHeight: 20 },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 14,
  },
  itemTitle: { fontSize: 15, fontWeight: '800', color: '#1B0258' },
  itemSubtitle: { marginTop: 2, fontSize: 13, color: '#7A7A90' },
  itemMeta: { marginTop: 4, fontSize: 12, color: '#9A9AAF' },

  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 14 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F2F0FF',
    borderRadius: 12,
  },
  chipText: { fontSize: 13, color: '#1B0258', fontWeight: '600' },
  seeMore: { marginTop: 12, color: '#4B3AFF', fontWeight: '700' },

  resumeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 12,
  },
  pdfBadge: {
    width: 46,
    height: 58,
    borderRadius: 10,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pdfText: { color: '#DC2626', fontWeight: '800', fontSize: 13 },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: { fontSize: 18, fontWeight: '800', color: '#1B0258' },
  label: { marginTop: 12, marginBottom: 6, fontWeight: '700', color: '#1B0258' },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#FAFAFC',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 10,
  },
  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#EFEFF4',
  },
  cancelText: { color: '#1B0258', fontWeight: '700' },
  saveBtn: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#1B0258',
  },
  saveText: { color: '#FFF', fontWeight: '800' },
});

const PRIMARY = '#1B0258';
const ACCENT = '#FF8A00';

function Section({ title, icon, children, onActionPress, actionIcon = 'create-outline' }) {
  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <Ionicons name={icon} size={20} color={ACCENT} />
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        {onActionPress ? (
          <TouchableOpacity style={styles.sectionAction} onPress={onActionPress}>
            <Ionicons name={actionIcon} size={16} color={ACCENT} />
          </TouchableOpacity>
        ) : null}
      </View>
      {children}
    </View>
  );
}
