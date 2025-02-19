// app/(tabs)/index.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { signOut } from 'aws-amplify/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabOneScreen() {
  const handleSignOut = async () => {
    try {
      await signOut({ global: true });
      // On sign-out, the RootLayout auth check will redirect to /auth.
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Button title="Sign Out" onPress={handleSignOut} />
      <Text className="text-xl font-bold">Tab One</Text>
    </SafeAreaView>
  );
}
