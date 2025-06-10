// components/JobSkeleton.tsx
import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { StyleSheet, View } from "react-native";

const JobSkeleton = () => (
  <View style={styles.container}>
    <ContentLoader
      width="100%"
      height={100}
      speed={1}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <Rect x="16" y="10" rx="4" ry="4" width="70%" height="20" />
      <Rect x="16" y="40" rx="3" ry="3" width="50%" height="15" />
      <Rect x="16" y="65" rx="3" ry="3" width="40%" height="15" />
      <Rect x="80%" y="10" rx="4" ry="4" width="15%" height="15" />
      <Rect x="16" y="90" rx="3" ry="3" width="30%" height="12" />
    </ContentLoader>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});

export default JobSkeleton;
