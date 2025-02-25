import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export const BackButton: React.FC = () => {
  const onBackPress = () => router.back();
  return (
    <TouchableOpacity
      onPress={onBackPress}
      style={{ marginBottom: verticalScale(10) }}
    >
      <Ionicons name="arrow-back" size={scale(24)} color="#000" />
    </TouchableOpacity>
  );
};
