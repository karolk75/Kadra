import React from "react";
import {
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

type AuthButtonProps = {
  title: string;
  onPress: () => void;
  style?: TouchableOpacityProps["style"];
  className?: string;
  titleStyle?: TextStyle;
  titleClassName?: string;
};

export const AuthButton: React.FC<AuthButtonProps> = ({
  title,
  onPress,
  style,
  className,
  titleStyle,
  titleClassName,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.button, style]}
    className={className}
  >
    <Text
      style={[styles.buttonText, titleStyle]}
      className={titleClassName}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    paddingVertical: verticalScale(14),
    borderRadius: scale(25),
    marginVertical: verticalScale(8),
  },
  buttonText: {
    fontSize: scale(14),
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  }
});
