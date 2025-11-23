import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({
  value,
  onChangeText,
  placeholder,
  onSubmitEditing,   // ⭐ 必须接收
  returnKeyType      // ⭐ 必须接收
}) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#A0A0A0" style={{ marginRight: 8 }} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#A0A0A0"

        // ⭐⭐ 关键点：透传触发回车事件
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});

export default SearchBar;
