import { useSession } from "@/src/context";
import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";

export default function PublicLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) return <Text>Loading...</Text>;
  if (session) return <Redirect href="/(auth)/(tabs)" />;

  return (
    <Stack
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
      }}
    />
  );
}
