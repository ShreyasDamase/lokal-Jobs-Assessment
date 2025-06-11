import { useAppDispatch } from "@/store/reduxHook";
import { addBookmark, removeBookmark } from "@/store/slices/bookmarksSlice";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type SectionRefs = {
  [key: string]: number;
};

const SECTION_TITLES = ["Overview", "Details", "Skills", "Location"];
const SCREEN_HEIGHT = Dimensions.get("window").height;

const JobDetail = () => {
  const dispatch = useAppDispatch();
  const { job } = useLocalSearchParams();

  const scrollRef = useRef<ScrollView>(null);
  const sectionRefs = useRef<SectionRefs>({
    Overview: 0,
    Details: 0,
    Skills: 0,
    Location: 0,
  });
  const [activeTab, setActiveTab] = useState("Overview");
  const [applyBtnLayout, setApplyBtnLayout] = useState({ y: 0, height: 0 });
  const [showStickyApply, setShowStickyApply] = useState(false);

  let parsedJob = null;
  try {
    parsedJob = JSON.parse(job as string);
  } catch (e) {
    console.error("Failed to parse job", e);
  }

  if (!parsedJob) {
    return <Text style={styles.errorText}>Error loading job details.</Text>;
  }

  const getDaysAgoText = (createdOn: string): string => {
    const createdDate = new Date(createdOn);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  const handleBookmark = () => {
    dispatch(addBookmark(parsedJob));
  };

  const handleRemoveBookmark = () => {
    dispatch(removeBookmark(parsedJob.id));
  };
  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const visibleHeight = event.nativeEvent.layoutMeasurement.height;

    const isVisible =
      scrollY + visibleHeight >= applyBtnLayout.y + applyBtnLayout.height;

    setShowStickyApply(!isVisible);

    const currentSection = Object.entries(sectionRefs.current).findLast(
      ([_, offset]) => scrollY >= offset - 80
    );
    if (currentSection && currentSection[0] !== activeTab) {
      setActiveTab(currentSection[0]);
    }
  };

  const scrollToSection = (section: string) => {
    const y = sectionRefs.current[section];
    scrollRef.current?.scrollTo({ y, animated: true });
  };

  const onLayout = (section: string, y: number) => {
    sectionRefs.current[section] = y;
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        stickyHeaderIndices={[1]}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        ref={scrollRef}
      >
        <View style={styles.header}>
          <View style={styles.imageContainer}>
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
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{parsedJob.title}</Text>
            <Text style={styles.company}>{parsedJob.company_name}</Text>
            <View style={styles.tagRow}>
              <View style={styles.tagContainer}>
                <Text style={styles.tagText}>{parsedJob.job_hours}</Text>
              </View>
              {parsedJob.primary_details?.Salary !== "-" && (
                <View style={styles.tagContainer}>
                  <Text style={styles.tagText}>
                    {parsedJob.primary_details?.Salary || "Not specified"}
                  </Text>
                </View>
              )}
              {parsedJob.job_category && (
                <View style={styles.tagContainer}>
                  <Text style={styles.tagText}>{parsedJob.job_category}</Text>
                </View>
              )}
            </View>
            <View style={styles.actionRow}>
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
              <TouchableOpacity
                style={styles.bookmarkButton}
                onPress={
                  parsedJob.is_bookmarked
                    ? handleRemoveBookmark
                    : handleBookmark
                }
              >
                <Ionicons name="bookmark" size={20} color="white" />
                <Text style={styles.bookmarkButtonText}>
                  {parsedJob.is_bookmarked ? "Bookmarked" : "Bookmark"}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaText}>
                {parsedJob.num_applications} applicants
              </Text>
              <Text style={styles.metaText}>
                {getDaysAgoText(parsedJob.created_on)}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabBar}
          contentContainerStyle={styles.tabBarContent}
        >
          {SECTION_TITLES.map((title) => (
            <TouchableOpacity
              key={title}
              style={[styles.tab, activeTab === title && styles.activeTab]}
              onPress={() => scrollToSection(title)}
            >
              <Text
                style={
                  activeTab === title ? styles.activeText : styles.inactiveText
                }
              >
                {title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView
          ref={scrollRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          // contentContainerStyle={styles.scrollView}
        >
          {SECTION_TITLES.map((title) => (
            <View
              key={title}
              onLayout={(e) => onLayout(title, e.nativeEvent.layout.y)}
              style={styles.section}
            >
              <Text style={styles.sectionTitle}>{title}</Text>

              {title === "Overview" && (
                <View style={styles.sectionContent}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Job Title:</Text>
                    <Text style={styles.detailValue}>{parsedJob.title}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Company:</Text>
                    <Text style={styles.detailValue}>
                      {parsedJob.company_name}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Salary:</Text>
                    <Text style={styles.detailValue}>
                      {parsedJob.primary_details?.Salary || "Not specified"}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Job Role:</Text>
                    <Text style={styles.detailValue}>{parsedJob.job_role}</Text>
                  </View>
                  {parsedJob.other_details && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Description:</Text>
                      <Text style={styles.detailValue}>
                        {parsedJob.other_details}
                      </Text>
                    </View>
                  )}
                </View>
              )}

              {title === "Details" && (
                <View style={styles.sectionContent}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Job Type:</Text>
                    <Text style={styles.detailValue}>
                      {parsedJob.job_hours}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Experience:</Text>
                    <Text style={styles.detailValue}>
                      {parsedJob.primary_details?.Experience || "N/A"}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Qualification:</Text>
                    <Text style={styles.detailValue}>
                      {parsedJob.primary_details?.Qualification || "N/A"}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Shift Timing:</Text>
                    <Text style={styles.detailValue}>
                      {parsedJob.primary_details?.Shift || "Day Shift"}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Vacancies:</Text>
                    <Text style={styles.detailValue}>
                      {parsedJob.openings_count || "N/A"}
                    </Text>
                  </View>
                </View>
              )}

              {title === "Skills" && (
                <View style={styles.sectionContent}>
                  {parsedJob.contentV3?.V3?.map((item: any, index: number) => (
                    <View key={index} style={styles.detailRow}>
                      <Text style={styles.detailLabel}>{item.field_name}:</Text>
                      <Text style={styles.detailValue}>{item.field_value}</Text>
                    </View>
                  ))}
                </View>
              )}

              {title === "Location" && (
                <View style={styles.sectionContent}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>City:</Text>
                    <Text style={styles.detailValue}>
                      {parsedJob.primary_details?.Place || "N/A"}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Locality:</Text>
                    <Text style={styles.detailValue}>
                      {parsedJob.locality || "N/A"}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Work Type:</Text>
                    <Text style={styles.detailValue}>
                      {parsedJob.primary_details?.WorkType || "N/A"}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ))}
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              marginLeft: 20,
              marginVertical: 5,
            }}
          >
            <TouchableOpacity
              style={styles.contactbutton}
              onPress={() => Linking.openURL(parsedJob.custom_link)}
            >
              <Ionicons name="call" size={20} color={"darkseagreen"} />
              <Text style={styles.contactbuttonText}>Call HR </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactbutton}
              onPress={() =>
                Linking.openURL(parsedJob.contact_preference.whatsapp_link)
              }
            >
              <Ionicons name="logo-whatsapp" size={20} color={"darkseagreen"} />
              <Text style={styles.contactbuttonText}>Whatsapp </Text>
            </TouchableOpacity>
          </View>
          <View
            onLayout={(e) =>
              setApplyBtnLayout({
                y: e.nativeEvent.layout.y,
                height: e.nativeEvent.layout.height,
              })
            }
          >
            <TouchableOpacity
              style={{
                alignItems: "center",
                backgroundColor: "#277ECF",
                margin: 10,
                padding: 10,
                borderRadius: 20,
                marginHorizontal: 20,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Apply Now
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ScrollView>
      {showStickyApply && (
        <View
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
            backgroundColor: "#277ECF",
            padding: 10,
            borderRadius: 20,
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <TouchableOpacity onPress={() => console.log("Apply clicked")}>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Apply Now
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  imageContainer: {
    marginBottom: 12,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
  },
  details: {
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  company: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  tagContainer: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: "#333",
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },

  callButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 1,
    alignItems: "center",
  },
  callButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  contactbutton: {
    backgroundColor: "#DDDDDD",
    borderRadius: 12,
    padding: 8,
    flexDirection: "row",
    gap: 2,
    alignSelf: "flex-start",
  },
  contactbuttonText: {
    color: "#0F0F0F",
    fontWeight: "bold",
  },
  bookmarkButton: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    flexDirection: "row",
  },
  bookmarkButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaText: {
    fontSize: 12,
    color: "#888",
  },
  tabBar: {
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    height: 50,
  },
  tabBarContent: {
    paddingHorizontal: 16,
    alignItems: "center",
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "center",
    height: "100%",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#2196F3",
  },
  activeText: {
    color: "#2196F3",
    fontWeight: "bold",
    fontSize: 14,
  },
  inactiveText: {
    color: "#666",
    fontSize: 14,
  },
  scrollView: {
    paddingBottom: 40,
  },
  section: {
    padding: 16,
    minHeight: SCREEN_HEIGHT * 0.2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  sectionContent: {
    gap: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgb(197 197 197)er",
    padding: 10,
    backgroundColor: "white",
    elevation: 4,
  },
  detailRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  detailLabel: {
    fontWeight: "bold",
    color: "#333",
    marginRight: 8,
  },
  detailValue: {
    color: "#555",
    flexShrink: 1,
  },
  errorText: {
    padding: 20,
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});

export default JobDetail;
