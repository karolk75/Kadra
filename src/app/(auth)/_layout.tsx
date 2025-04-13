import { useSession } from "@/context";
import { Redirect, Stack } from "expo-router";
import { Platform, Text } from "react-native";

export default function AuthLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) return <Text>Loading...</Text>;
  if (!session) return <Redirect href="/(public)/pre-login" />;

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
