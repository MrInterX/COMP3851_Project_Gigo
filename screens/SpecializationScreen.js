// screens/SpecializationScreen.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DATA = [
  { id: 1, title: "Design", icon: "color-palette-outline" },
  { id: 2, title: "IT / Software", icon: "code-slash-outline" },
  { id: 3, title: "Retail", icon: "bag-outline" },
  { id: 4, title: "Hospitality", icon: "restaurant-outline" },
  { id: 5, title: "Logistics", icon: "cube-outline" },
  { id: 6, title: "Education", icon: "school-outline" },
];

export default function SpecializationScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        
        {/* 返回按钮 */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={26} color="#4A3AFF" />
        </TouchableOpacity>

        {/* 标题 */}
        <Text style={styles.title}>Choose a Specialization</Text>

        {/* 分类宫格 */}
        <View style={styles.grid}>
          {DATA.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Filter", { category: item.title })}
            >
              <Ionicons name={item.icon} size={38} color="#4A3AFF" />
              <Text style={styles.cardText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scroll: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },

  backBtn: {
    width: 50,
    height: 50,
    justifyContent: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginTop: 5,
    marginBottom: 25,
    color: "#000",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    height: 145,
    backgroundColor: "#F3EDFF",
    borderRadius: 18,
    marginBottom: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#3A2E7C",
  },
});
