import { Slot, SplashScreen, Stack } from "expo-router";
import AuthProvider from "../context/AuthProvider";
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';

import "../../global.css"
import { GestureHandlerRootView } from "react-native-gesture-handler";

export {
  ErrorBoundary,
} from 'expo-router';

// export const unstable_settings = {
//   initialRouteName: '(tabs)',
// };

SplashScreen.preventAutoHideAsync();
Amplify.configure(outputs);

export default function Root() {
  const [fontsLoaded, fontsError] = useFonts({
    PoppinsBlack: require('../../assets/fonts/Poppins-Black.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    PoppinsExtraBold: require('../../assets/fonts/Poppins-ExtraBold.ttf'),
    PoppinsExtraLight: require('../../assets/fonts/Poppins-ExtraLight.ttf'),
    PoppinsLight: require('../../assets/fonts/Poppins-Light.ttf'),
    PoppinsMedium: require('../../assets/fonts/Poppins-Medium.ttf'),
    PoppinsRegular: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('../../assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsThin: require('../../assets/fonts/Poppins-Thin.ttf'),
    ...FontAwesome.font,
  });
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    if (fontsError) throw fontsError;
  }, [fontsError]);

  useEffect(() => {
    if (fontsLoaded && authLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, authLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider onAuthLoaded={() => setAuthLoaded(true)}>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
