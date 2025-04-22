import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Amplify } from "aws-amplify";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { EventProvider } from "react-native-outside-press";
import outputs from "../../amplify_outputs.json";

import { ReduxProvider } from "@/store/provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { ActivityIndicator, Platform, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../../global.css";
import ErrorModal from "../components/ErrorModal";
import { SessionProvider } from "../context/AuthContext";
import { DataProvider } from "../context/DataContext";
import ErrorProvider from "../context/ErrorContext";
import { useColorScheme } from "../lib/useColorScheme";
import AuthenticatedLayout from "./(auth)/_layout";
import PublicLayout from "./(public)/_layout";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  checkAuthState,
  selectIsAuthenticated,
  selectIsLoading,
} from "@/store/slices/authSlice";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  screenOptions: {
    gestureEnabled: true,
  },
};

SplashScreen.preventAutoHideAsync();
Amplify.configure(outputs);

function RootLayoutNav() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoading);
  const [layoutReady, setLayoutReady] = useState(false);

  useEffect(() => {
    // Check authentication state when the component mounts
    dispatch(checkAuthState());
  }, [dispatch]);

  // Hide splash screen when layout is ready and not loading
  useEffect(() => {
    if (layoutReady && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [layoutReady, isLoading]);

  // Show loading state while checking authentication
  if (isLoading) {
    return null;
  }

  // When layout is ready, mark it as such
  const onLayoutReady = () => {
    setLayoutReady(true);
  };

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutReady}>
      {isAuthenticated ? <AuthenticatedLayout /> : <PublicLayout />}
    </View>
  );
}

export default function Root() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const [fontsLoaded, fontsError] = useFonts({
    PoppinsBlack: require("../../assets/fonts/Poppins-Black.ttf"),
    PoppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
    PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
    PoppinsExtraLight: require("../../assets/fonts/Poppins-ExtraLight.ttf"),
    PoppinsLight: require("../../assets/fonts/Poppins-Light.ttf"),
    PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsThin: require("../../assets/fonts/Poppins-Thin.ttf"),
    PoppinsItalic: require("../../assets/fonts/Poppins-Italic.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (fontsError) throw fontsError;
  }, [fontsError]);

  useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("theme");
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add("bg-background");
      }
      if (!theme) {
        AsyncStorage.setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === "dark" ? "dark" : "light";
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
      }
      setIsColorSchemeLoaded(true);
    })();
  }, [fontsLoaded]);

  if (!fontsLoaded || !isColorSchemeLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <DataProvider>
        <ReduxProvider>
          <SessionProvider>
            <ErrorProvider>
              <EventProvider>
                {/* <RootLayoutNav /> */}
                <Slot />
                <ErrorModal />
              </EventProvider>
            </ErrorProvider>
          </SessionProvider>
        </ReduxProvider>
      </DataProvider>
    </GestureHandlerRootView>
  );
}
