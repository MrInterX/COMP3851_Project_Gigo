// screens/NoResultScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NoResultScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={90} color="#C9C9C9" />

      <Text style={styles.title}>No Results Found</Text>
      <Text style={styles.subtitle}>
        We couldn’t find any jobs matching your search.
      </Text>

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.navigate("JobList")}
      >
        <Text style={styles.backText}>Back to Job List</Text>
      </TouchableOpacity>
    </View>
  );
}

// ----------------------- Styles -----------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 30,
    paddingBottom: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 20,
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#777",
    textAlign: "center",
    marginBottom: 30,
  },
  backBtn: {
    backgroundColor: "#4B3F72",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  backText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
