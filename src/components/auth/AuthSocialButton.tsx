import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleProp, Text, TouchableOpacity, ViewStyle } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export enum Social {
  FACEBOOK = "facebook",
  GOOGLE = "google",
}

type AuthSocialButtonProps = {
  title: string;
  iconName: Social;
  iconColor: string;
  textColor: string;
  style: StyleProp<ViewStyle>;
  className: string;
  onPress?: () => void;
};

export const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  title,
  iconName,
  iconColor,
  textColor,
  style,
  className,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          paddingVertical: verticalScale(14),
          borderRadius: scale(25),
        },
        style,
      ]}
      className={className}
    >
      <FontAwesome
        name={iconName}
        size={scale(20)}
        color={iconColor}
        style={{ marginRight: scale(8) }}
      />
      <Text
        style={{
          fontSize: scale(14),
          color: textColor,
          fontWeight: "500",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
