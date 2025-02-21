import React, { useEffect } from "react";
import { Button } from "react-native";
import { View, Text } from "@/src/components/Themed";
import { useAuth } from "@/src/context/AuthProvider";

export default function TabTwoScreen() {
  const { user, logout } = useAuth();

  useEffect(() => {
    // console.log("Tab Two - user:", user);
  }, [user]);

  if (!user) return <Text>Loading...</Text>;

  return (
    <View className="flex-1 flex-col justify-center px-4 items-center">
      <Text className="text-xl">Account</Text>
      <Text className="mb-4">{user?.username || "No username"}</Text>
      <Button title="Log out" onPress={logout} />
    </View>
  );
}
