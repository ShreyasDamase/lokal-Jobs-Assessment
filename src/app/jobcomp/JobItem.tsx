import UseGetDate from "@/hooks/useGetDate";
import { useAppDispatch } from "@/store/reduxHook";
import { addBookmark, removeBookmark } from "@/store/slices/bookmarksSlice";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";

import {
  Alert,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type JobItemProps = {
  job: any;
  type?: "bookMarks" | "jobs"; // or whatever types you use
};
const JobItem: React.FC<JobItemProps> = ({ job, type }) => {
  console.log("type:", type);
  const dispatch = useAppDispatch();

  const { getDaysAgoText } = UseGetDate();

  const handleBookmark = (job: any) => {
    console.log("bookmarkId", job.id);
    dispatch(addBookmark(job));
  };
  const handleRemoveBookmark = (job: any) => {
    Alert.alert("Are you sure you want to remove bookmark", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          console.log("OK Pressed");
          dispatch(removeBookmark(job.id));
        },
      },
    ]);
    console.log("bookmarkId", job.id);

    // dispatch(removeBookmark(job.id));
  };
  const handleLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    console.log("JobItem height:", height);
  };

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/job",
          params: { job: JSON.stringify(job) },
        })
      }
    >
      <View style={styles.container} onLayout={handleLayout}>
        {job.creatives?.length > 0 &&
          (job.creatives[0].file ? (
            <Image
              source={{ uri: job.creatives[0].file }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={require("@/assets/images/placeHolder.png")}
              style={styles.image}
              resizeMode="cover"
            />
          ))}
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {job.title}
          </Text>
          <Text style={styles.company}>{job.company_name}</Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              flexWrap: "wrap",
              marginTop: 4,
            }}
          >
            <View style={styles.jobTypeContainer}>
              <Text style={styles.jobType}>{job.job_hours}</Text>
            </View>
            {job.primary_details?.Salary !== "-" && (
              <View style={styles.jobTypeContainer}>
                <Text style={styles.salary}>
                  {job.primary_details?.Salary || "Salary not specified"}
                </Text>
              </View>
            )}
            {job.custom_link && (
              <TouchableOpacity
                style={styles.callButton}
                onPress={() => Linking.openURL(job.custom_link)}
              >
                <Text style={styles.callButtonText}>
                  {job.button_text || "📞 Call"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.location}>{job.primary_details?.Place}</Text>
          <Text style={styles.location}>{getDaysAgoText(job.created_on)}</Text>
        </View>

        <TouchableOpacity
          style={{ margin: 8 }}
          onPress={() => {
            if (type === "jobs") {
              handleBookmark(job);
            } else handleRemoveBookmark(job);
          }}
        >
          <Ionicons
            name={
              type === "jobs"
                ? "bookmark-outline"
                : "ellipsis-horizontal-outline"
            }
            size={24}
          />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#D1D1D1B6",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
    elevation: 8,
    backgroundColor: "white",
  },
  details: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  company: {
    color: "#666",
    marginTop: 2,
  },
  salary: {
    textAlign: "center",
    fontSize: 12,
  },
  jobTypeContainer: {
    marginTop: 5,
    padding: 5,
    backgroundColor: "gainsboro",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },

  jobType: {
    textAlign: "center",
    fontSize: 12,
  },
  callButton: {
    backgroundColor: "rgb(86 162 255)",
    marginTop: 5,
    padding: 5,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  callButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  location: {
    color: "#666",
    marginTop: 2,
  },
  button: {
    backgroundColor: "#0E56A8",
    padding: 8,
    borderRadius: 5,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
  },
});

export default JobItem;
