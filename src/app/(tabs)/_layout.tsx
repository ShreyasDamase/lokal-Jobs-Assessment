import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";
import { Text, TouchableNativeFeedback, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Latest Jobs",
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerTitleStyle: {
            color: "#019BA2",
          },
          tabBarButton: (props) => (
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple(
                "rgba(43 153 197 / 0.3)",
                false
              )}
              useForeground={true}
              onPress={props.onPress}
            >
              <View
                style={{
                  flex: 1,
                  top: 4,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Ionicons
                  size={24}
                  name="briefcase-sharp"
                  color={
                    props.accessibilityState?.selected ? "#A5A5A5" : "#019BA2"
                  }
                />
                <Text style={{ textAlign: "center", fontSize: 13 }}>Jobs</Text>
              </View>
            </TouchableNativeFeedback>
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          headerTitle: "Latest Jobs",
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerTitleStyle: {
            color: "#019BA2",
          },
          tabBarButton: (props) => (
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple(
                "rgba(43 153 197 / 0.3)",
                false
              )}
              useForeground={true}
              onPress={props.onPress}
            >
              <View
                style={{
                  flex: 1,
                  top: 4,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Ionicons
                  size={23}
                  name="bookmarks"
                  color={
                    props.accessibilityState?.selected ? "#A5A5A5" : "#019BA2"
                  }
                />
                <Text style={{ textAlign: "center", fontSize: 13 }}>
                  Bookmarks
                </Text>
              </View>
            </TouchableNativeFeedback>
          ),
        }}
      />
    </Tabs>
  );
}
