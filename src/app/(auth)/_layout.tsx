import { Redirect, Slot, Stack } from 'expo-router';
import { useSession } from '@/src/context';
import { Text } from 'react-native';

export default function AuthLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) return <Text>Loading...</Text>;
  if (!session) return <Redirect href="/(public)/pre-login" />;

  return (
    <Stack
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
      }}
    />
  );
}