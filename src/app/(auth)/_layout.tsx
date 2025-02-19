// // app/(auth)/_layout.tsx
// import React from 'react';
// import { Text } from 'react-native';
// import { Slot, Redirect } from 'expo-router';
// import { useSession } from '../ctx';

// export default function AuthLayout() {
//   const { session, isLoading } = useSession();

//   if (isLoading) {
//     return <Text>Loading...</Text>;
//   }

//   if (session) {
//     return <Redirect href="/(tabs)" />;
//   }

//   return <Slot />;
// }
