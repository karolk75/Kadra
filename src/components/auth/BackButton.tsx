import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export const BackButton: React.FC = () => {
  const onBackPress = () => router.back();
  return (
    <TouchableOpacity onPress={onBackPress} style={styles.button}>
      <Ionicons name="arrow-back" size={scale(24)} color="#000" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: verticalScale(10),
  },
});
