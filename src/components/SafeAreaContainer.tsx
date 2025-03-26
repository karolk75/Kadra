import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

type SafeAreaContainerProps = {
  children: React.ReactNode;
};

export const SafeAreaContainer: React.FC<SafeAreaContainerProps> = ({
  children,
}) => (
  <SafeAreaView className="flex-1">
    {children}
  </SafeAreaView>
);
