import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../store/reduxHook";
import JobItem from "../jobcomp/JobItem";

const BookMarksScreen = () => {
  const dispatch = useAppDispatch();

  const bookmarks = useAppSelector((state) => state.bookMarks.bookmarks) as any;

  const renderEmpty = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No jobs found</Text>
      </View>
    );
  };

  return (
    <FlashList
      data={bookmarks}
      renderItem={({ item }) => <JobItem job={item} type="bookMarks" />}
      keyExtractor={(item: any) => item.id.toString()}
      estimatedItemSize={100}
      onEndReachedThreshold={0.5}
    />
  );
};

export default BookMarksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  footer: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  jobCard: {
    backgroundColor: "#EC4545",
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  jobText: {
    fontSize: 16,
    color: "#333",
  },
});
