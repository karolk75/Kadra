import React from "react";
import { Text } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

type ErrorMessageProps = {
  message: string;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <Text
    style={{
      fontSize: scale(12),
      marginBottom: verticalScale(10),
    }}
    className="text-rose-700 text-center"
  >
    {message}
  </Text>
);
