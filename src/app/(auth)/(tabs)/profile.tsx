import { useSession } from "@/context";
import React from "react";
import { Button, Text, View } from "react-native";

export default function ProfileScreen() {
  const { signOut } = useSession();

  // useEffect(() => {
  //   // console.log("Tab Two - user:", user);
  // }, [user]);

  // if (!user) return <Text>Loading...</Text>;

  return (
    <View className="flex-1 flex-col justify-center px-4 items-center">
      <Text className="text-xl">Account</Text>
      {/* <Text className="mb-4">{user?.username || "No username"}</Text> */}
      <Button title="Log out" onPress={signOut} />
    </View>
  );
}
