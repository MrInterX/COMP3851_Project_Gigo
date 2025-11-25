import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

import SearchBar from "../components/SearchBar";
import JobCard from "../components/JobCard";
import { Ionicons } from "@expo/vector-icons";
import { getJobsWithFilters } from "../services/jobService";

const hotKeywords = ["Tutor", "Driver", "Barista", "Designer"];

export default function JobListScreen({ navigation, route }) {
  const routeParams = route?.params ?? null;
  const presetJobs = Array.isArray(routeParams?.presetJobs)
    ? routeParams.presetJobs
    : null;
  const hasPresetJobs = Boolean(presetJobs?.length);

  const normalizedFilters = useMemo(() => {
    if (!routeParams || hasPresetJobs) {
      return {
        category: "",
        subCategory: "",
        jobType: "",
        workplaceType: "",
        experience: "",
        location: "",
        salaryMin: null,
        salaryMax: null,
        lastUpdate: "",
      };
    }
    const raw = routeParams ?? {};
    const sanitize = (value) =>
      value && value !== "Any" ? value : "";
    return {
      category: raw.category || "",
      subCategory: raw.subCategory || "",
      jobType: sanitize(raw.jobType),
      workplaceType: sanitize(raw.workplaceType),
      experience: sanitize(raw.experience),
      location: raw.location || "",
      salaryMin:
        typeof raw.salaryMin === "number" ? raw.salaryMin : null,
      salaryMax:
        typeof raw.salaryMax === "number" ? raw.salaryMax : null,
      lastUpdate: raw.lastUpdate || "",
    };
  }, [routeParams, hasPresetJobs]);

  const hasFilters = useMemo(() => {
    if (!routeParams) return false;
    return Object.keys(routeParams).some((key) => key !== "presetJobs");
  }, [routeParams]);

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchJobs = useCallback(async () => {
    if (hasPresetJobs) return;
    setLoading(true);
    try {
      const data = await getJobsWithFilters({
        search,
        ...normalizedFilters,
      });
      setJobs(data || []);
    } catch (error) {
      console.error("Failed to load jobs with filters", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [hasPresetJobs, search, normalizedFilters]);

  useEffect(() => {
    if (hasPresetJobs && presetJobs) {
      const keyword = search.trim().toLowerCase();
      const filtered = presetJobs.filter((job) => {
        const haystack = `${job.title} ${job.company} ${job.location}`.toLowerCase();
        return !keyword || haystack.includes(keyword);
      });
      setJobs(filtered);
      setLoading(false);
      return;
    }
    fetchJobs();
  }, [hasPresetJobs, presetJobs, search, fetchJobs]);

  // -------- HANDLE SUBMIT SEARCH ----------
  const handleSubmitSearch = (event) => {
    const text = event.nativeEvent.text;
    setSearch(text);
  };

  // -------- HOT KEYWORD PRESS ----------
  const handleHotKeywordPress = (keyword) => {
    setSearch(keyword);
  };

  // -------- CHECK FOR NO RESULTS & NAVIGATE ----------
  useEffect(() => {
    if (hasPresetJobs) return;
    if (!loading && hasFilters && jobs.length === 0) {
      navigation.replace("NoResultScreen");
    }
  }, [loading, hasFilters, jobs.length, navigation, hasPresetJobs]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={{ flex: 1 }}>

        {/* SEARCH BAR */}
        <View style={styles.searchRow}>
          <View style={styles.searchInputWrapper}>
            <SearchBar
              value={search}
              onChangeText={setSearch}
              placeholder="Search job title or keywords"
              returnKeyType="search"
              onSubmitEditing={handleSubmitSearch}
            />
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => navigation.navigate("Filter")}
          >
            <Ionicons name="options-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* HOT KEYWORDS */}
        <Text style={styles.hotTitle}>Recommended searches</Text>
        <View style={styles.hotRow}>
          {hotKeywords.map((keyword, index) => (
            <TouchableOpacity
              key={index}
              style={styles.hotTag}
              onPress={() => handleHotKeywordPress(keyword)}
            >
              <Text style={styles.hotText}>{keyword}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* LOADING */}
        {loading && (
          <ActivityIndicator
            size="large"
            color="#150B3D"
            style={{ marginTop: 20 }}
          />
        )}

        {/* LIST */}
        {!loading && (
          <FlatList
            data={jobs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <JobCard
                title={item.title}
                company={item.company}
                location={item.location}
                type={item.job_type}
                salary={item.salary_min}
                salaryUnit={item.salary_unit}
                logoUrl={item.logo_url}
                icon="briefcase-outline"
                onPress={() =>
                  navigation.navigate("JobDetail", { jobId: item.id })
                }
              />
            )}
            contentContainerStyle={{
              paddingBottom: 120,
              marginTop: 10,
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
    paddingHorizontal: 18,
    marginTop: 10,
  },
  searchInputWrapper: {
    flex: 1,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#150B3D",
    alignItems: "center",
    justifyContent: "center",
  },
  hotTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    paddingHorizontal: 18,
    color: "#150B3D",
  },
  hotRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
    paddingHorizontal: 18,
  },
  hotTag: {
    backgroundColor: "#F4F4F4",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 14,
  },
  hotText: {
    color: "#150B3D",
    fontWeight: "600",
  },
});
