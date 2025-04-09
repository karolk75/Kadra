// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // Enable CSS support for web
  isCSSEnabled: true,
});

// Enhance performance
config.transformer.minifierConfig = {
  keep_classnames: true,
  keep_fnames: true,
};

// Add custom configurations
config.resolver.sourceExts.push("mjs");

// Add additional path aliases if needed
config.resolver.extraNodeModules = {
  "@": path.resolve(__dirname, "src"),
};

// Apply NativeWind configuration
module.exports = withNativeWind(config, { input: "./global.css" });
