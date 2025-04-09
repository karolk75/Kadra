import { StyleSheet } from "react-native";

export const createShadowStyle = (elevation = 8, opacity = 0.3) => ({
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: opacity,
  shadowRadius: 4.65,
  elevation,
});

export const commonStyles = StyleSheet.create({
  shadow: createShadowStyle(),
  lightShadow: createShadowStyle(4, 0.2),
});
