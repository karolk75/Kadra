import { ExpoConfig } from "expo/config";

// Import env variables if you need them
// import "dotenv/config";

const defineConfig = (): ExpoConfig => {
  return {
    name: "Kadra",
    slug: "Kadra",
    scheme: "kadra",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.anonymous.Kadra",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.anonymous.Kadra",
      permissions: [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
      ],
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      "expo-secure-store",
      "expo-image-picker",
      "expo-file-system",
      "expo-document-picker",
      "expo-camera",
      [
        "expo-font",
        {
          fonts: [
            "./assets/fonts/Poppins-Black.ttf",
            "./assets/fonts/Poppins-Bold.ttf",
            "./assets/fonts/Poppins-ExtraBold.ttf",
            "./assets/fonts/Poppins-ExtraLight.ttf",
            "./assets/fonts/Poppins-Light.ttf",
            "./assets/fonts/Poppins-Medium.ttf",
            "./assets/fonts/Poppins-Regular.ttf",
            "./assets/fonts/Poppins-SemiBold.ttf",
            "./assets/fonts/Poppins-Thin.ttf",
          ],
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    updates: {
      enabled: true,
      checkAutomatically: "ON_ERROR_RECOVERY",
      fallbackToCacheTimeout: 0,
    },
    // Uncomment if you want to opt-in to the New Architecture
    // newArchEnabled: true,
  };
};

export default defineConfig(); 