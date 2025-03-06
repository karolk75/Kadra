import { Redirect } from 'expo-router';

export default function Root() {
  // Redirect to auth or public route based on your app's logic
  return <Redirect href="/(auth)/(tabs)" />;
} 