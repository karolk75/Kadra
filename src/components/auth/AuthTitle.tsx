import React from "react";
import { Text } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

type AuthTitleProps = {
  children: React.ReactNode;
};

export const AuthTitle: React.FC<AuthTitleProps> = ({ children }) => (
  <Text
    style={{ fontSize: scale(24), marginBottom: verticalScale(20) }}
    className="self-center font-poppins-bold text-center"
  >
    {children}
  </Text>
);
