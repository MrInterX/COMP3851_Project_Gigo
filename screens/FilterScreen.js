import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Slider } from "@miblanchard/react-native-slider";
import { Ionicons } from "@expo/vector-icons";
import presetJobs from '../data/presetJobs';

const SUB_CATEGORIES = {
  Design: ["UI/UX Design", "Graphic Design", "Content Design", "Branding"],
  "IT Software": ["Frontend", "Backend", "Mobile", "Data"],
  Retail: ["Sales Assistant", "Cashier"],
  Hospitality: ["Waiter", "Front Desk"],
  Logistics: ["Driver", "Warehouse", "Inventory", "Rider"],
  Education: ["Tutor", "Teaching Assistant"],
  Events: ["Event Support", "Crew Leader"],
  Admin: ["Office Admin", "Customer Support"],
  Sports: ["Coach Assistant"],
  Marketing: ["Brand Promoter"],
  "F&B": ["Barista", "Delivery Rider"],
};

const UNLIMITED_LABEL = "Any";
const ANY_TIME_LABEL = "Any time";
const ANY_LOCATION = "All locations";
const LAST_UPDATE_DAYS = { Recent: 3, "Last week": 7, "Last month": 30 };
const sanitizeUnlimited = (value) =>
  value === UNLIMITED_LABEL ? null : value;
const normalizeLabel = (value = '') => value.toLowerCase().replace(/[\s-]/g, '');
const toHourlyRate = (job) =>
  job.salary_unit?.toLowerCase() === 'month'
    ? Number(job.salary_min || 0) / 160
    : Number(job.salary_min || 0);

const buildOptions = (items = [], anyLabel = UNLIMITED_LABEL) => {
  const list = Array.from(new Set(items.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b),
  );
  return anyLabel ? [...list, anyLabel] : list;
};

export default function FilterScreen({ route, navigation }) {
  const category = route.params?.category || "Design";
  const categoryJobs = useMemo(
    () => presetJobs.filter((job) => job.category === category),
    [category],
  );
  const subCategorySource = useMemo(() => {
    if (SUB_CATEGORIES[category]?.length) return SUB_CATEGORIES[category];
    const dynamicSubs = Array.from(
      new Set(categoryJobs.map((job) => job.sub_category).filter(Boolean)),
    );
    return dynamicSubs.length ? dynamicSubs : ["General"];
  }, [category, categoryJobs]);

  const jobTypeOptions = useMemo(
    () => buildOptions(categoryJobs.map((job) => job.job_type)),
    [categoryJobs],
  );
  const workplaceOptions = useMemo(
    () => buildOptions(categoryJobs.map((job) => job.workplace_type)),
    [categoryJobs],
  );
  const experienceOptions = useMemo(
    () => buildOptions(categoryJobs.map((job) => job.experience_level)),
    [categoryJobs],
  );
  const locationOptions = useMemo(() => {
    const locations = Array.from(
      new Set(categoryJobs.map((job) => job.location).filter(Boolean)),
    ).sort((a, b) => a.localeCompare(b));
    return locations.length ? [ANY_LOCATION, ...locations] : [ANY_LOCATION];
  }, [categoryJobs]);

  const salaryBounds = useMemo(() => {
    const values = categoryJobs.map(toHourlyRate).filter((v) => Number.isFinite(v));
    if (!values.length) return { min: 10, max: 50 };
    return { min: Math.floor(Math.min(...values)), max: Math.ceil(Math.max(...values)) };
  }, [categoryJobs]);

  const [subCategory, setSubCategory] = useState(subCategorySource[0]);
  const [salaryMin, setSalaryMin] = useState(salaryBounds.min);
  const [salaryMax, setSalaryMax] = useState(salaryBounds.max);
  const [jobType, setJobType] = useState(UNLIMITED_LABEL);
  const [positionLevel, setPositionLevel] = useState(UNLIMITED_LABEL);
  const [lastUpdate, setLastUpdate] = useState(ANY_TIME_LABEL);
  const [workplaceType, setWorkplaceType] = useState(UNLIMITED_LABEL);
  const [experience, setExperience] = useState(UNLIMITED_LABEL);
  const [locationValue, setLocationValue] = useState(ANY_LOCATION);

  const [showSubList, setShowSubList] = useState(false);
  const [showPosition, setShowPosition] = useState(false);
  const [showLastUpdate, setShowLastUpdate] = useState(false);
  const [showWorkplace, setShowWorkplace] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  useEffect(() => {
    setSubCategory(subCategorySource[0]);
    setSalaryMin(salaryBounds.min);
    setSalaryMax(salaryBounds.max);
    setJobType(UNLIMITED_LABEL);
    setPositionLevel(UNLIMITED_LABEL);
    setLastUpdate(ANY_TIME_LABEL);
    setWorkplaceType(UNLIMITED_LABEL);
    setExperience(UNLIMITED_LABEL);
    setLocationValue(ANY_LOCATION);
    setShowSubList(false);
    setShowLocation(false);
  }, [category, subCategorySource, salaryBounds]);

  const resetFilters = () => {
    setSubCategory(subCategorySource[0]);
    setSalaryMin(salaryBounds.min);
    setSalaryMax(salaryBounds.max);
    setJobType(UNLIMITED_LABEL);
    setPositionLevel(UNLIMITED_LABEL);
    setLastUpdate(ANY_TIME_LABEL);
    setWorkplaceType(UNLIMITED_LABEL);
    setExperience(UNLIMITED_LABEL);
    setLocationValue(ANY_LOCATION);
  };

  const handleApplyFilters = () => {
    const filteredJobs = categoryJobs.filter((job) => {
      if (subCategory && job.sub_category !== subCategory) return false;

      const matchesJobType =
        jobType === UNLIMITED_LABEL ||
        normalizeLabel(job.job_type) === normalizeLabel(jobType);

      const matchesWorkplace =
        workplaceType === UNLIMITED_LABEL ||
        normalizeLabel(job.workplace_type) === normalizeLabel(workplaceType);

      const matchesExperience =
        experience === UNLIMITED_LABEL ||
        job.experience_level?.toLowerCase() === experience.toLowerCase();

      const matchesLocation =
        locationValue === ANY_LOCATION ||
        job.location?.toLowerCase() === locationValue.toLowerCase();

      const hourly = toHourlyRate(job);
      const matchesSalary = hourly >= salaryMin && hourly <= salaryMax;

      const matchesLastUpdate = (() => {
        if (lastUpdate === ANY_TIME_LABEL) return true;
        const allowedDays = LAST_UPDATE_DAYS[lastUpdate];
        if (!allowedDays || !job.updated_at) return true;
        const updatedAt = new Date(job.updated_at);
        const diffDays =
          (Date.now() - updatedAt.getTime()) / (1000 * 60 * 60 * 24);
        return diffDays <= allowedDays;
      })();

      return (
        matchesJobType &&
        matchesWorkplace &&
        matchesExperience &&
        matchesLocation &&
        matchesSalary &&
        matchesLastUpdate
      );
    });

    if (filteredJobs.length === 0) {
      navigation.replace('NoResultScreen');
      return;
    }

    navigation.navigate('JobList', {
      presetJobs: filteredJobs,
    });
  };

  const handleChangeCategory = () => {
    navigation.navigate("Specialization");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* 返回按钮 */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#150B3D" />
        </TouchableOpacity>

        {/* 标题 */}
        <Text style={styles.title}>Filter</Text>

        {/* Category */}
        <Text style={styles.label}>Category</Text>
        <TouchableOpacity
          style={styles.inputBox}
          activeOpacity={0.75}
          onPress={handleChangeCategory}
        >
          <View style={styles.categoryRow}>
            <Text style={styles.inputText}>{category}</Text>
            <Text style={styles.categoryHint}>Change</Text>
          </View>
        </TouchableOpacity>

        {/* Sub Category */}
        <Text style={styles.label}>Sub Category</Text>
        <TouchableOpacity style={styles.inputBox} onPress={() => setShowSubList(!showSubList)}>
          <Text style={styles.inputText}>{subCategory}</Text>
          <Ionicons
            name={showSubList ? "chevron-up" : "chevron-down"}
            size={20}
            color="#150B3D"
            style={styles.chevron}
          />
        </TouchableOpacity>

        {showSubList && (
          <View style={styles.subList}>
            {SUB_CATEGORIES[category].map((item) => (
              <TouchableOpacity
                key={item}
                style={[styles.subItem, subCategory === item && styles.subItemActive]}
                onPress={() => {
                  setSubCategory(item);
                  setShowSubList(false);
                }}
              >
                <Text
                  style={[
                    styles.subItemText,
                    subCategory === item && styles.subItemTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Location */}
        <Text style={styles.label}>Location</Text>
        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => setShowLocation(!showLocation)}
        >
          <Text style={styles.inputText}>{locationValue}</Text>
          <Ionicons
            name={showLocation ? "chevron-up" : "chevron-down"}
            size={20}
            color="#150B3D"
            style={styles.chevron}
          />
        </TouchableOpacity>
        {showLocation && (
          <View style={styles.subList}>
            {locationOptions.map((loc) => (
              <TouchableOpacity
                key={loc}
                style={[
                  styles.subItem,
                  locationValue === loc && styles.subItemActive,
                ]}
                onPress={() => {
                  setLocationValue(loc);
                  setShowLocation(false);
                }}
              >
                <Text
                  style={[
                    styles.subItemText,
                    locationValue === loc && styles.subItemTextActive,
                  ]}
                >
                  {loc}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Salary */}
        <Text style={styles.label}>Salary</Text>

        <Slider
          value={[salaryMin, salaryMax]}
          onValueChange={(val) => {
            setSalaryMin(val[0]);
            setSalaryMax(val[1]);
          }}
          minimumValue={10}
          maximumValue={50}
          step={1}
          minimumTrackTintColor="#FFD6AD"
          thumbTintColor="#150B3D"
        />

        <View style={styles.salaryRow}>
          <Text style={styles.salaryText}>${salaryMin}</Text>
          <Text style={styles.salaryText}>${salaryMax}</Text>
        </View>

        {/* Job Type */}
        <Text style={styles.label}>Job Type</Text>
        <View style={styles.jobTypeScroll}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.jobTypeRow}
          >
            {jobTypeOptions.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.jobTypeBtn,
                  jobType === type && styles.jobTypeBtnActive,
                ]}
                onPress={() => setJobType(type)}
              >
                <Text
                  style={[
                    styles.jobTypeText,
                    jobType === type && styles.jobTypeTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Position Level — 前端自定义，数据库无此字段，保持但不传给 API */}
        <Text style={styles.label}>Position level</Text>
        <TouchableOpacity style={styles.inputBox} onPress={() => setShowPosition(!showPosition)}>
          <Text style={styles.inputText}>{positionLevel}</Text>
          <Ionicons
            name={showPosition ? "chevron-up" : "chevron-down"}
            size={20}
            color="#150B3D"
            style={styles.chevron}
          />
        </TouchableOpacity>

        {showPosition && (
          <View style={styles.subList}>
            {[UNLIMITED_LABEL, "Junior", "Senior", "Leader", "Manager"].map((item) => (
              <TouchableOpacity
                key={item}
                style={[styles.levelBtn, positionLevel === item && styles.levelBtnActive]}
                onPress={() => {
                  setPositionLevel(item);
                  setShowPosition(false);
                }}
              >
                <Text
                  style={[
                    styles.levelText,
                    positionLevel === item && styles.levelTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Last Update */}
        <Text style={styles.label}>Last update</Text>
        <TouchableOpacity style={styles.inputBox} onPress={() => setShowLastUpdate(!showLastUpdate)}>
          <Text style={styles.inputText}>{lastUpdate}</Text>
          <Ionicons
            name={showLastUpdate ? "chevron-up" : "chevron-down"}
            size={20}
            color="#150B3D"
            style={styles.chevron}
          />
        </TouchableOpacity>

        {showLastUpdate && (
          <View style={styles.radioContainer}>
            {["Recent", "Last week", "Last month", "Any time"].map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.radioRow}
                onPress={() => setLastUpdate(item)}
              >
                <View
                  style={[
                    styles.radioOuter,
                    lastUpdate === item && styles.radioOuterSelected,
                  ]}
                >
                  {lastUpdate === item && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioLabel}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Type of Workplace */}
        <Text style={styles.label}>Type of workplace</Text>
        <TouchableOpacity style={styles.inputBox} onPress={() => setShowWorkplace(!showWorkplace)}>
          <Text style={styles.inputText}>{workplaceType}</Text>
          <Ionicons
            name={showWorkplace ? "chevron-up" : "chevron-down"}
            size={20}
            color="#150B3D"
            style={styles.chevron}
          />
        </TouchableOpacity>

        {showWorkplace && (
          <View style={styles.radioContainer}>
            {workplaceOptions.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.radioRow}
                onPress={() => setWorkplaceType(item)}
              >
                <View
                  style={[
                    styles.radioOuter,
                    workplaceType === item && styles.radioOuterSelected,
                  ]}
                >
                  {workplaceType === item && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioLabel}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Experience */}
        <Text style={styles.label}>Experience</Text>
        <TouchableOpacity style={styles.inputBox} onPress={() => setShowExperience(!showExperience)}>
          <Text style={styles.inputText}>{experience}</Text>
          <Ionicons
            name={showExperience ? "chevron-up" : "chevron-down"}
            size={20}
            color="#150B3D"
            style={styles.chevron}
          />
        </TouchableOpacity>

        {showExperience && (
          <View style={styles.radioContainer}>
            {experienceOptions.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.radioRow}
                onPress={() => setExperience(item)}
              >
                <View
                  style={[
                    styles.radioOuter,
                    experience === item && styles.radioOuterSelected,
                  ]}
                >
                  {experience === item && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioLabel}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.applyBtn}
          onPress={handleApplyFilters}
        >
          <Text style={styles.applyText}>Apply Now</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

/* ------------------------ */
/* STYLES */
/* ------------------------ */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },

  scroll: { paddingHorizontal: 22, paddingBottom: 160 },

  backBtn: { width: 40, marginTop: 20 },

  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    color: "#150B3D",
    marginTop: -20,
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
    color: "#150B3D",
  },

  inputBox: {
    backgroundColor: "#F4F4F4",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 10,
  },

  inputText: { color: "#150B3D", fontSize: 15 },

  chevron: { position: "absolute", right: 12, top: 14 },

  subList: { marginTop: 8, marginBottom: 10 },

  subItem: {
    padding: 12,
    backgroundColor: "#F4F4F4",
    borderRadius: 10,
    marginBottom: 10,
  },
  subItemActive: { backgroundColor: "#150B3D" },
  subItemText: { color: "#150B3D", fontWeight: "500" },
  subItemTextActive: { color: "#FFF", fontWeight: "700" },

  salaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  salaryText: { color: "#150B3D", fontWeight: "700", fontSize: 16 },

  jobTypeScroll: { marginTop: 12 },
  jobTypeRow: {
    flexDirection: "row",
    columnGap: 12,
    paddingRight: 12,
  },
  jobTypeBtn: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: "#F4EFEA",
    alignItems: "center",
  },
  jobTypeBtnActive: { backgroundColor: "#150B3D" },
  jobTypeText: { color: "#150B3D", fontWeight: "600" },
  jobTypeTextActive: { color: "white", fontWeight: "700" },

  /* New – Position Level */
  levelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "#F4F4F4",
    marginBottom: 10,
  },
  levelBtnActive: {
    backgroundColor: "#FFD6AD",
  },
  levelText: {
    color: "#150B3D",
    fontWeight: "600",
  },
  levelTextActive: {
    color: "#150B3D",
    fontWeight: "700",
  },

  /* Radio Buttons */
  radioContainer: { marginTop: 12, marginBottom: 10 },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#150B3D",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  radioOuterSelected: { borderColor: "#120d07ff" },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#150B3D",
  },
  radioLabel: { color: "#150B3D", fontSize: 15 },

  /* Bottom Buttons — fixed */
  btnRow: {
    position: "absolute",
    bottom: 20,
    left: 22,
    right: 22,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  resetBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#EDEDED",
    marginRight: 10,
    alignItems: "center",
  },
  resetText: { fontWeight: "700", color: "#150B3D" },

  applyBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#150B3D",
    marginLeft: 10,
    alignItems: "center",
  },
  applyText: { color: "white", fontWeight: "700", fontSize: 16 },

  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryHint: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FF8A00",
  },
});
