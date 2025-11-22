// screens/SearchScreen.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import FilterButton from "../components/FilterButton";
import { Ionicons } from "@expo/vector-icons";

export default function SearchScreen({ navigation }) {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    if (keyword.trim() === "") {
      // 如果搜索框是空的 → 跳"无结果页"
      navigation.navigate("NoResult");
    } else {
      // 之后可改成跳搜索结果页
      navigation.navigate("NoResult");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* 🔙 Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={26} color="#4B3F72" />
      </TouchableOpacity>

      {/* 🔍 Search Row */}
      <View style={styles.searchRow}>
        <SearchBar
          value={keyword}
          onChangeText={setKeyword}
          placeholder="Search jobs"
          style={{ flex: 1 }}
        />

        <TouchableOpacity onPress={() => navigation.navigate("Filter")}>
          <Ionicons name="options-outline" size={28} color="#4B3F72" />
        </TouchableOpacity>
      </View>

      {/* 🔘 Search Button */}
      <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
        <Text style={styles.searchText}>SEARCH</Text>
      </TouchableOpacity>

      {/* 🔗 Specialization */}
      <TouchableOpacity
        style={styles.specialBtn}
        onPress={() => navigation.navigate("Specialization")}
      >
        <Text style={styles.specialText}>Browse by Specializations →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ---------------- Styles ----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  backBtn: {
    marginBottom: 20,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
  },
  searchBtn: {
    backgroundColor: "#4B3F72",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 18,
  },
  searchText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
  specialBtn: {
    backgroundColor: "#F5F0FF",
    paddingVertical: 14,
    borderRadius: 12,
  },
  specialText: {
    textAlign: "center",
    color: "#4B3F72",
    fontSize: 16,
    fontWeight: "600",
  },
});
