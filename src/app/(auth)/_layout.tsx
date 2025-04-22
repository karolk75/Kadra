import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";

export default function AuthLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <Stack
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
        presentation: "card",
        gestureDirection: "horizontal",
        fullScreenGestureEnabled: Platform.OS === "ios",
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
