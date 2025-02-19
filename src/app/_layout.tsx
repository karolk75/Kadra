import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Amplify } from 'aws-amplify';

import { useColorScheme } from '@/src/components/useColorScheme';
import outputs from '../../amplify_outputs.json';

import "../../global.css"
import CustomAuthFlow from '../components/auth/CustomAuthFlow';
import { getCurrentUser } from 'aws-amplify/auth';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();
Amplify.configure(outputs);

export default function RootLayout() {
  const [loaded, error] = useFonts({
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // On app launch, check if the user is already authenticated.
  useEffect(() => {
    (async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.log("No authenticated user found");
      }
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <CustomAuthFlow onAuthComplete={() => setIsAuthenticated(true)} />
      </GestureHandlerRootView>
    );
  }

  return (
    <RootLayoutNav />
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
