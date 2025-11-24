import React from 'react'; 
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const messages = [
  {
    id: '1',
    name: 'Andy Robertson',
    avatar: 'https://i.pravatar.cc/150?img=26',
    message: 'Oh yes, please send your CV/Res...',
    time: '5m ago',
    unread: 2,
  },
  {
    id: '2',
    name: 'Giorgio Chiellini',
    avatar: 'https://i.pravatar.cc/150?img=12',
    message: 'Hello sir, Good Morning',
    time: '30m ago',
  },
  {
    id: '3',
    name: 'Alex Morgan',
    avatar: 'https://i.pravatar.cc/150?img=1',
    message: 'I saw the UI/UX Designer vac...',
    time: '09:30 am',
  },
];

export default function MessagesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput placeholder="Search message" style={styles.input} />
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Chat', { user: item })}
          >
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <View style={styles.row}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <Text style={styles.message}>{item.message}</Text>
            </View>

            {item.unread ? (
              <View style={styles.unreadDot}>
                <Text style={styles.unreadText}>{item.unread}</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 20 },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  input: { marginLeft: 10, fontSize: 16 },
  item: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontWeight: '600', fontSize: 16 },
  time: { color: '#999' },
  message: { color: '#666', marginTop: 3 },
  unreadDot: {
    backgroundColor: '#FE7B00',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: 'center',
  },
  unreadText: { color: '#fff', fontSize: 12 },
});
