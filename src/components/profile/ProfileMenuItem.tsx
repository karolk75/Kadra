import React, { ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

type ProfileMenuItemProps = {
  icon: ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
};

export const ProfileMenuItem = ({
  icon,
  title,
  subtitle,
  onPress,
}: ProfileMenuItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      // style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      style={styles.container}
    >
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  pressed: {
    opacity: 0.7,
  },
  iconContainer: {
    marginRight: scale(12),
    width: scale(40),
    height: scale(40),
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: scale(18),
    color: "#7B8794", // Light blue color from design
    marginBottom: verticalScale(2),
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: scale(14),
    color: "#A1A4B2",
  },
});
