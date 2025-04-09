module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // React Native Reanimated plugin is needed for animations
      "react-native-reanimated/plugin",
    ],
  };
};
