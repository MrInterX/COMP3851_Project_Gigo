import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../services/supabaseClient';

export default function AIScreen({ navigation }) {
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [displayGreeting, setDisplayGreeting] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadUserName();
  }, []);

  async function loadUserName() {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        setUserName('there');
        return;
      }
      const name =
        data.user.user_metadata?.full_name ||
        (data.user.email ? data.user.email.split('@')[0] : 'there');
      setUserName(name);
    } catch {
      setUserName('there');
    }
  }

  useEffect(() => {
    const finalText = `HHi ${userName || 'there'}, I'm Gigo AI. I can browse roles for you, check your applications, or open your latest messages. What would you like to do today?`;
    let index = 0;
    setDisplayGreeting('');
    const timer = setInterval(() => {
      setDisplayGreeting((prev) => prev + finalText.charAt(index));
      index += 1;
      if (index >= finalText.length) clearInterval(timer);
    }, 18);
    return () => clearInterval(timer);
  }, [userName]);

  const appendMessage = (text, fromUser = true) => {
    const newMsg = { id: Date.now().toString(), text, fromUser };
    setMessages((prev) => [...prev, newMsg]);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    appendMessage(message.trim(), true);
    setMessage('');
    setTimeout(() => {
      appendMessage('Noted! I will get that ready for you.', false);
    }, 400);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 12 : 0}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#1B0258" />
          </TouchableOpacity>
          <Text style={styles.title}>AI Assistant</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heroCard}>
            <Text style={styles.greet}>{displayGreeting}</Text>
          </View>

          <Text style={styles.sectionLabel}>Quick actions</Text>
          <View style={styles.actionGrid}>
            <ActionCard
              icon="search-outline"
              label="Browse jobs"
              onPress={() => navigation.navigate('JobList')}
              color="#E6F2FF"
            />
            <ActionCard
              icon="document-text-outline"
              label="My applications"
              onPress={() => navigation.navigate('MyApplications')}
              color="#FFF0E0"
            />
            <ActionCard
              icon="chatbubbles-outline"
              label="Messages"
              onPress={() => navigation.navigate('Messages')}
              color="#EFE8FF"
            />
            <ActionCard
              icon="sparkles-outline"
              label="Ask for tips"
              onPress={() => {
                setMessage('Suggest ways to improve my profile');
              }}
              color="#E7F8F1"
            />
          </View>

          {messages.length > 0 && <Text style={styles.sectionLabel}>Conversation</Text>}
          <View style={styles.chatArea}>
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.bubble,
                  msg.fromUser ? styles.userBubble : styles.aiBubble,
                ]}
              >
                <Text style={msg.fromUser ? styles.userText : styles.aiText}>{msg.text}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Ask me anything..."
            value={message}
            onChangeText={setMessage}
            returnKeyType="send"
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <Ionicons name="send" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function ActionCard({ icon, label, onPress, color }) {
  return (
    <TouchableOpacity style={[styles.actionCard, { backgroundColor: color }]} onPress={onPress}>
      <View style={styles.actionIconWrap}>
        <Ionicons name={icon} size={18} color="#1B0258" />
      </View>
      <Text style={styles.actionCardText}>{label}</Text>
      <Ionicons name="chevron-forward" size={16} color="#1B0258" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F7FB',
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  content: { paddingBottom: 140, gap: 16 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: { fontSize: 20, fontWeight: '800', color: '#1B0258' },
  heroCard: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    paddingVertical: 6,
    paddingHorizontal: 0,
    marginBottom: 18,
  },
  greet: { fontSize: 18, marginLeft: 20,marginRight: 20, fontWeight: '700', color: '#1B0258', lineHeight: 24 },
  greetSub: { marginTop: 6, fontSize: 14, color: '#E7E4FF' },
  sectionLabel: { fontSize: 20, marginLeft: 10, marginRight: 20, fontWeight: '700', color: '#1B0258', marginBottom: 10, marginTop: 4 },
  actions: { gap: 10 },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '47%',
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginLeft: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  actionIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFFAA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  actionCardText: {
    fontSize: 15,
    color: '#1B0258',
    fontWeight: '700',
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#F7F7FB',
    borderTopWidth: 1,
    borderTopColor: '#ECECF2',
    backgroundColor: '#FFFFFF',
  },
  input: { flex: 1, height: 44, fontSize: 14 },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#1B0258',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatArea: { gap: 12, paddingBottom: 12, marginTop: 12 },
  bubble: {
    maxWidth: '85%',
    padding: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#120042',
    marginRight: 10,
    borderBottomRightRadius: 6,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    marginLeft: 10,
    borderBottomLeftRadius: 6,
  },
  userText: { color: '#FFF', fontSize: 14 },
  aiText: { color: '#1B0258', fontSize: 14 },
});
