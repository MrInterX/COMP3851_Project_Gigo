import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatScreen({ route }) {
  const { user } = route.params; // ⭐ 接收从 MessagesScreen 传来的 user
  const PRIMARY = "#1E0A73";

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: "1", text: "Hello sir, Good Morning", fromMe: true },
    { id: "2", text: "Morning, Can I help you?", fromMe: false },
    { id: "3", text: "I saw the UI/UX Designer vacancy that you uploaded yesterday.", fromMe: true },
    { id: "4", text: "Oh yes, please send your CV/Resume here.", fromMe: false }
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), text: message, fromMe: true }]);
    setMessage("");
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: user.avatar }}   // ⭐ 统一头像
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.online}>• Online</Text>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        style={{ paddingHorizontal: 20 }}
        contentContainerStyle={{ paddingVertical: 20 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubble,
              item.fromMe ? styles.myBubble : styles.otherBubble
            ]}
          >
            <Text style={item.fromMe ? styles.myText : styles.otherText}>
              {item.text}
            </Text>
          </View>
        )}
      />

      {/* Input */}
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Write your message"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendIcon}>{">"}</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const PRIMARY = "#1E0A73";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12
  },

  name: { fontSize: 18, fontWeight: "700" },
  online: { color: "green", marginTop: 2 },

  bubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 18,
    marginVertical: 6,
  },
  myBubble: {
    backgroundColor: PRIMARY,
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: "#F0F0F0",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  myText: { color: "#FFF" },
  otherText: { color: "#333" },

  inputArea: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFF",
    borderTopWidth: 0.5,
    borderColor: "#ddd"
  },

  input: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10
  },

  sendBtn: {
    backgroundColor: PRIMARY,
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },

  sendIcon: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "900",
    marginLeft: 2
  }
});
