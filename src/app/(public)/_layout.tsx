import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";

export default function PublicLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <Stack
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
        fullScreenGestureEnabled: Platform.OS === "ios",
        animation: "slide_from_right",
      }}
    />
  );
}
