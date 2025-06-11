import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function RootLayout() {
  return (
    <React.Fragment>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Job Details",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
            headerTitleStyle: {
              color: "#019BA2",
            },
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </React.Fragment>
  );
}
