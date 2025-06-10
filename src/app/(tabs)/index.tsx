import JobSkeleton from "@/components/JobSkeleton";
import { FlashList } from "@shopify/flash-list";
import React, { useCallback } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../store/reduxHook";
import { refreshJobs, setLoading } from "../../store/slices/jobSlice";
import JobItem from "../jobcomp/JobItem";

const HomeScreen = () => {
  const dispatch = useAppDispatch();

  console.log("Dispatch type:", typeof dispatch); // Should be "function"

  const {
    jobs = [],
    loading,
    error,
    hasMore,
    isRefreshing,
  } = useAppSelector((state) => state.jobs) as any;
  const data = loading && jobs.length === 0 ? Array(5).fill("skeleton") : jobs;

  const loadMoreJobs = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = Math.floor(jobs.length / 10) + 1;
      dispatch(setLoading({ page: nextPage }));
    }
  }, [loading, hasMore, jobs.length, dispatch]);

  const handleRefresh = useCallback(() => {
    dispatch(refreshJobs());
  }, [dispatch]);

  const renderItem = useCallback(({ item }: any) => {
    if (item === "skeleton") {
      return <JobSkeleton />;
    }
    return <JobItem job={item} type="jobs" />;
  }, []);

  const renderFooter = () => {
    if (!loading || !hasMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" />
        <Text style={styles.loadingText}>Loading more jobs...</Text>
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) return null;
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No jobs found</Text>
      </View>
    );
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error.toString()}</Text>
      </View>
    );
  }

  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) =>
        item === "skeleton" ? `skeleton-${index}` : item.id.toString()
      }
      estimatedItemSize={160}
      onEndReached={loadMoreJobs}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
    />
  );
};

export default HomeScreen;

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
