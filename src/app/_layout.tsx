import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Amplify } from "aws-amplify";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
import outputs from "../../amplify_outputs.json";

import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../../global.css";
import { SessionProvider } from "../context";
import { useColorScheme } from "../lib/useColorScheme";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
  screenOptions: {
    gestureEnabled: true,
  },
};

SplashScreen.preventAutoHideAsync();
Amplify.configure(outputs);

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
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (fontsError) throw fontsError;
  }, [fontsError]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
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

        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, [fontsLoaded]);

  if (!fontsLoaded || !isColorSchemeLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </GestureHandlerRootView>
  );
}
