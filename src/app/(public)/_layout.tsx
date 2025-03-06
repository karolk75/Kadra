import { useSession } from "@/context";
import { Redirect, Stack } from "expo-router";
import { Platform, Text } from "react-native";

export default function PublicLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) return <Text>Loading...</Text>;
  if (session) return <Redirect href="/(auth)/(tabs)" />;

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
