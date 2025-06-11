import { useAppDispatch } from "@/store/reduxHook";
import { addBookmark, removeBookmark } from "@/store/slices/bookmarksSlice";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const JobDetail = () => {
  const dispatch = useAppDispatch();
  const { job } = useLocalSearchParams();

  let parsedJob = null;
  try {
    parsedJob = JSON.parse(job as string);
  } catch (e) {
    console.error("Failed to parse job", e);
  }

  if (!parsedJob)
    return <Text style={styles.errorText}>Error loading job details.</Text>;

  const getDaysAgoText = (createdOn: string): string => {
    const createdDate = new Date(createdOn);
    const today = new Date();

    let years = today.getFullYear() - createdDate.getFullYear();
    let months = today.getMonth() - createdDate.getMonth();
    let days = today.getDate() - createdDate.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    if (years === 0 && months === 0 && days === 0) return "Today";
    if (years === 0 && months === 0 && days === 1) return "Yesterday";

    const parts = [];
    if (years > 0) parts.push(`${years} year${years > 1 ? "s" : ""}`);
    if (months > 0) parts.push(`${months} month${months > 1 ? "s" : ""}`);
    if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);

    return parts.join(", ") + " ago";
  };

  const handleBookmark = () => {
    dispatch(addBookmark(parsedJob));
  };

  const handleRemoveBookmark = () => {
    dispatch(removeBookmark(parsedJob.id));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        {parsedJob.creatives?.[0]?.file ? (
          <Image
            source={{ uri: parsedJob.creatives[0].file }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={require("@/assets/images/placeHolder.png")}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <View style={styles.details}>
          <Text style={styles.title}>{parsedJob.title}</Text>
          <Text style={styles.company}>{parsedJob.company_name}</Text>
          <View style={styles.tagRow}>
            <View style={styles.jobTypeContainer}>
              <Text style={styles.jobType}>{parsedJob.job_hours}</Text>
            </View>
            {parsedJob.primary_details?.Salary !== "-" && (
              <View style={styles.jobTypeContainer}>
                <Text style={styles.salary}>
                  {parsedJob.primary_details?.Salary || "Not specified"}
                </Text>
              </View>
            )}
            {parsedJob.custom_link && (
              <TouchableOpacity
                style={styles.callButton}
                onPress={() => Linking.openURL(parsedJob.custom_link)}
              >
                <Text style={styles.callButtonText}>
                  {parsedJob.button_text || "📞 Call"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {/* <Text style={styles.location}>
            {parsedJob.primary_details?.Place}
          </Text> */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 4,
            }}
          >
            <Text style={styles.location}>
              {parsedJob.num_applications} applicants
            </Text>
            <Text style={styles.location}>
              {getDaysAgoText(parsedJob.created_on)}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: "#D1D1D1B6",
    paddingBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "white",
  },
  details: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  company: {
    color: "#666",
    marginTop: 2,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 6,
  },
  jobTypeContainer: {
    backgroundColor: "gainsboro",
    padding: 5,
    borderRadius: 16,
  },
  jobType: {
    fontSize: 12,
  },
  salary: {
    fontSize: 12,
    textAlign: "center",
  },
  callButton: {
    backgroundColor: "#56A2FF",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  callButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  location: {
    color: "#666",
    marginTop: 4,
    fontSize: 12,
  },
  errorText: {
    padding: 20,
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});

export default JobDetail;
