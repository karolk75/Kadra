import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

type KeyboardAwareContainerProps = {
  children: React.ReactNode;
};

export const KeyboardAwareContainer: React.FC<KeyboardAwareContainerProps> = ({
  children,
}) => (
  <KeyboardAwareScrollView
    contentContainerStyle={{
      flexGrow: 1,
      paddingHorizontal: scale(20),
      paddingTop: verticalScale(20),
      paddingBottom: verticalScale(20),
    }}
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps="handled"
  >
    <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
  </KeyboardAwareScrollView>
);
