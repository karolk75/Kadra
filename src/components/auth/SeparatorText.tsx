import React from "react";
import { Text, TextInputProps } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

type SeparatorTextProps = {
  children: string | string[];
};

export const SeparatorText: React.FC<SeparatorTextProps & TextInputProps> = ({
  children,
  style,
}) => (
  <Text
    style={[{ fontSize: scale(14), marginVertical: verticalScale(14) }, style]}
    className="text-center text-[#A1A4B2] font-poppins-bold"
  >
    {children}
  </Text>
);
