// components/SearchBar.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search",
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      <Ionicons
        name="search-outline"
        size={20}
        color="#A0A0A0"
        style={{ marginRight: 8 }}
      />

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#A0A0A0"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },
});
